import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Alert, Bed, Hospital, Patient, Prediction, ResourceRecord, Staff, User } from './models.js';

const app = express();
const port = Number(process.env.PORT || 5000);
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET is required. Copy server/.env.example to server/.env and set a unique secret.');
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));

const asyncRoute = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const auth = asyncRoute(async (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Sign in is required.' });
  try { req.user = jwt.verify(token, jwtSecret); next(); }
  catch { return res.status(401).json({ message: 'Your session is invalid or expired.' }); }
});
const issueToken = (user) => jwt.sign({ id: user.id, role: user.role, hospitalId: user.hospitalId }, jwtSecret, { expiresIn: '12h' });
const validId = (value) => mongoose.isValidObjectId(value);

app.get('/api/health', (req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

app.post('/api/auth/register', asyncRoute(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '') || (password || '').length < 8) {
    return res.status(400).json({ message: 'Enter a name, valid email, and password with at least 8 characters.' });
  }
  if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: 'An account with this email already exists.' });
  const user = await User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 12), role: 'Staff' });
  const publicUser = { id: user.id, name: user.name, email: user.email, role: user.role, hospitalId: user.hospitalId };
  res.status(201).json({ success: true, token: issueToken(user), user: publicUser });
}));
app.post('/api/auth/login', asyncRoute(async (req, res) => {
  const user = await User.findOne({ email: (req.body.email || '').toLowerCase() }).select('+passwordHash');
  if (!user || !await bcrypt.compare(req.body.password || '', user.passwordHash)) return res.status(401).json({ message: 'Email or password is incorrect.' });
  res.json({ success: true, token: issueToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role, hospitalId: user.hospitalId } });
}));
app.get('/api/auth/me', auth, asyncRoute(async (req, res) => {
  const user = await User.findById(req.user.id).select('name email role hospitalId');
  if (!user) return res.status(404).json({ message: 'Account not found.' });
  res.json({ success: true, user });
}));

app.get('/api/hospitals/summary', asyncRoute(async (req, res) => {
  const hospital = await Hospital.findOne({ hospitalId: req.user?.hospitalId || 'HOSP-001' }).lean();
  const [bedCounts, staffCounts, todaysAdmissions, emergencyCases] = await Promise.all([
    Bed.aggregate([{ $match: { hospitalId: hospital?.hospitalId || 'HOSP-001' } }, { $group: { _id: { type: '$type', status: '$status' }, count: { $sum: 1 } } }]),
    Staff.aggregate([{ $match: { hospitalId: hospital?.hospitalId || 'HOSP-001' } }, { $group: { _id: { role: '$role', availability: '$availability' }, count: { $sum: 1 } } }]),
    Patient.countDocuments({ hospitalId: hospital?.hospitalId || 'HOSP-001', admissionDate: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }),
    Patient.countDocuments({ hospitalId: hospital?.hospitalId || 'HOSP-001', department: 'Emergency', status: 'Admitted' })
  ]);
  const beds = (type) => bedCounts.filter(x => x._id.type === type).reduce((a, x) => ({ ...a, [x._id.status]: x.count }), {});
  const staff = (role) => staffCounts.filter(x => x._id.role === role).reduce((a, x) => ({ ...a, [x._id.availability]: x.count }), {});
  const general = beds('General'); const icu = beds('ICU'); const emergency = beds('Emergency'); const isolation = beds('Isolation');
  const totalBeds = hospital?.totalBeds ?? 100; const totalICUBeds = hospital?.totalICUBeds ?? 20;
  const occupiedBeds = general.Occupied || 0; const occupiedICUBeds = icu.Occupied || 0;
  const doc = staff('Doctor'); const nurse = staff('Nurse');
  const totalDoctors = Object.values(doc).reduce((a, n) => a + n, 0); const totalNurses = Object.values(nurse).reduce((a, n) => a + n, 0);
  const body = {
    hospitalName: hospital?.hospitalName || 'CareFlow Hospital', location: hospital?.location || 'Central Medical District',
    totalBeds, occupiedBeds, availableBeds: Math.max(0, totalBeds - occupiedBeds), totalICUBeds, occupiedICUBeds, availableICUBeds: Math.max(0, totalICUBeds - occupiedICUBeds),
    totalEmergencyBeds: hospital?.totalEmergencyBeds ?? 12, occupiedEmergencyBeds: emergency.Occupied || 0,
    totalIsolationBeds: hospital?.totalIsolationBeds ?? 10, occupiedIsolationBeds: isolation.Occupied || 0,
    todaysAdmissions, emergencyCases, totalDoctors, availableDoctors: (doc['On Duty'] || 0) + (doc.Available || 0),
    totalNurses, availableNurses: (nurse['On Duty'] || 0) + (nurse.Available || 0),
    capacityScore: Math.round((occupiedBeds / Math.max(1, totalBeds)) * 100), departments: hospital?.departments || []
  };
  res.json({ success: true, hospital: body });
}));

app.get('/api/patients', auth, asyncRoute(async (req, res) => {
  const filter = { hospitalId: req.user.hospitalId };
  if (req.query.status) filter.status = req.query.status;
  if (req.query.department) filter.department = req.query.department;
  const patients = await Patient.find(filter).sort({ admissionDate: -1 }).limit(Math.min(Number(req.query.limit) || 200, 500)).lean();
  res.json({ success: true, patients });
}));
app.post('/api/patients', auth, asyncRoute(async (req, res) => {
  const body = { ...req.body, hospitalId: req.user.hospitalId };
  if (!body.patientId) body.patientId = `PT-${Date.now()}`;
  res.status(201).json({ success: true, patient: await Patient.create(body) });
}));
app.patch('/api/patients/:id', auth, asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid patient id.' });
  const patient = await Patient.findOneAndUpdate({ _id: req.params.id, hospitalId: req.user.hospitalId }, req.body, { new: true, runValidators: true });
  if (!patient) return res.status(404).json({ message: 'Patient not found.' });
  res.json({ success: true, patient });
}));

app.get('/api/beds', auth, asyncRoute(async (req, res) => {
  const beds = await Bed.find({ hospitalId: req.user.hospitalId }).sort({ type: 1, bedNumber: 1 }).lean();
  res.json({ success: true, beds });
}));
app.post('/api/beds', auth, asyncRoute(async (req, res) => res.status(201).json({ success: true, bed: await Bed.create({ ...req.body, hospitalId: req.user.hospitalId }) })));
app.patch('/api/beds/:id', auth, asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid bed id.' });
  const bed = await Bed.findOneAndUpdate({ _id: req.params.id, hospitalId: req.user.hospitalId }, req.body, { new: true, runValidators: true });
  if (!bed) return res.status(404).json({ message: 'Bed not found.' });
  res.json({ success: true, bed });
}));

app.get('/api/staff', auth, asyncRoute(async (req, res) => res.json({ success: true, staff: await Staff.find({ hospitalId: req.user.hospitalId }).sort({ role: 1, name: 1 }).lean() })));
app.post('/api/staff', auth, asyncRoute(async (req, res) => res.status(201).json({ success: true, staff: await Staff.create({ ...req.body, hospitalId: req.user.hospitalId }) })));
app.patch('/api/staff/:id', auth, asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid staff id.' });
  const staff = await Staff.findOneAndUpdate({ _id: req.params.id, hospitalId: req.user.hospitalId }, req.body, { new: true, runValidators: true });
  if (!staff) return res.status(404).json({ message: 'Staff member not found.' });
  res.json({ success: true, staff });
}));

app.get('/api/alerts', auth, asyncRoute(async (req, res) => res.json({ success: true, alerts: await Alert.find({ hospitalId: req.user.hospitalId }).sort({ createdAt: -1 }).lean() })));
app.patch('/api/alerts/:id/resolve', auth, asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid alert id.' });
  const alert = await Alert.findOneAndUpdate({ _id: req.params.id, hospitalId: req.user.hospitalId }, { isResolved: true }, { new: true });
  if (!alert) return res.status(404).json({ message: 'Alert not found.' });
  res.json({ success: true, alert });
}));

app.post('/api/predictions/forecast', auth, asyncRoute(async (req, res) => {
  const period = req.body.forecastPeriod || '7 Days';
  const days = period === '24 Hours' ? 1 : Number.parseInt(period, 10) || 7;
  const records = await ResourceRecord.find({ hospitalId: req.user.hospitalId, ...(req.body.department && req.body.department !== 'All' ? { department: req.body.department } : {}) }).sort({ date: -1 }).limit(14).lean();
  const ordered = records.reverse();
  const avg = (records.length ? records.reduce((sum, row) => sum + (row.admissions || row.totalPatients || 120), 0) / records.length : 126);
  const trend = ordered.length > 1 ? ((ordered.at(-1).admissions || avg) - (ordered[0].admissions || avg)) / Math.max(ordered.length - 1, 1) : 1.2;
  const forecast = Math.max(0, Math.round(avg + trend * days));
  const timeline = ordered.slice(-7).map((row, index) => ({ day: `Day -${Math.max(1, 6 - index)}`, Historical: row.admissions || row.totalPatients || 0, Forecast: null }));
  timeline.push({ day: 'Today', Historical: Math.round(avg), Forecast: Math.round(avg) });
  for (let day = 1; day <= days; day++) timeline.push({ day: `+${day}d`, Historical: null, Forecast: Math.round(avg + trend * day) });
  const hospital = await Hospital.findOne({ hospitalId: req.user.hospitalId }).lean();
  const prediction = {
    predictedPatients: forecast,
    predictedBedDemand: Math.ceil(forecast * 0.72), predictedICUDemand: Math.ceil(forecast * 0.14),
    doctorsRequired: Math.ceil(forecast / 9), nursesRequired: Math.ceil(forecast / 3.5), riskLevel: forecast > (hospital?.totalBeds || 100) ? 'High' : 'Moderate',
    confidenceScore: records.length >= 7 ? 0.88 : 0.62,
    recommendation: `Based on ${records.length} saved operational records, demand is estimated at ${forecast} patients over ${period}. Review projected bed and staff requirements before making operational decisions.`
  };
  const saved = await Prediction.create({ forecastPeriod: period, department: req.body.department || 'All', predictedPatients: prediction.predictedPatients, predictedBedDemand: prediction.predictedBedDemand, predictedICUDemand: prediction.predictedICUDemand, riskLevel: prediction.riskLevel, confidenceScore: prediction.confidenceScore, recommendation: prediction.recommendation, timeline, hospitalId: req.user.hospitalId });
  res.json({ success: true, prediction: { ...prediction, id: saved.id }, timeline, factors: [{ factor: 'Recent admissions trend', impact: `${trend >= 0 ? 'Increasing' : 'Decreasing'} (${Math.abs(trend).toFixed(1)} per day)` }, { factor: 'Historical records', impact: `${records.length} records analyzed` }], availableBeds: hospital?.totalBeds || 100, availableICU: hospital?.totalICUBeds || 20, potentialGap: Math.max(0, prediction.predictedBedDemand - (hospital?.totalBeds || 100)) });
}));

app.post('/api/simulation', auth, asyncRoute(async (req, res) => {
  const increase = Math.max(0, Number(req.body.patientIncreasePct) || 0);
  const projectedPatients = Math.round((Number(req.body.baselinePatients) || 120) * (1 + increase / 100));
  const projectedBeds = Math.ceil(projectedPatients * 0.72);
  const projectedICU = Math.ceil(projectedPatients * 0.14);
  const availableBeds = Number(req.body.availableBeds) || 100;
  const requiredDoctors = Math.ceil(projectedPatients / 9); const requiredNurses = Math.ceil(projectedPatients / 3.5);
  const bedGap = Math.max(0, projectedBeds - availableBeds);
  const simulation = { projectedPatients, projectedBeds, projectedICU, requiredDoctors, requiredNurses, resourceGap: { bedGap, icuGap: Math.max(0, projectedICU - 20), doctorGap: Math.max(0, requiredDoctors - 34), nurseGap: Math.max(0, requiredNurses - 78), totalGap: bedGap }, operationalStatus: bedGap > 10 ? 'Critical' : bedGap ? 'High' : 'Normal', summary: `With a ${increase}% increase, estimated demand is ${projectedPatients} patients and ${projectedBeds} beds; the estimated bed gap is ${bedGap}.` };
  res.json({ success: true, simulation });
}));

app.get('/api/analytics', auth, asyncRoute(async (req, res) => {
  const [patientsByDepartment, recentPredictions] = await Promise.all([
    Patient.aggregate([{ $match: { hospitalId: req.user.hospitalId, status: 'Admitted' } }, { $group: { _id: '$department', patients: { $sum: 1 } } }, { $sort: { patients: -1 } }]),
    Prediction.find({ hospitalId: req.user.hospitalId }).sort({ createdAt: -1 }).limit(10).lean()
  ]);
  res.json({ success: true, patientsByDepartment, recentPredictions });
}));

app.post('/api/seed', asyncRoute(async (req, res) => {
  if (process.env.NODE_ENV === 'production') return res.status(404).json({ message: 'Not found.' });
  let hospital = await Hospital.findOne({ hospitalId: 'HOSP-001' });
  if (!hospital) hospital = await Hospital.create({ hospitalId: 'HOSP-001' });
  const [patientsN, bedsN, staffN, recordsN] = await Promise.all([Patient.countDocuments(), Bed.countDocuments(), Staff.countDocuments(), ResourceRecord.countDocuments()]);
  if (!bedsN) {
    const types = [['General', 'General', 100], ['ICU', 'ICU', 20], ['Emergency', 'Emergency', 12], ['Isolation', 'Isolation', 10]];
    const beds = [];
    for (const [type, department, total] of types) for (let i = 1; i <= total; i++) beds.push({ bedNumber: `${type.slice(0, 3).toUpperCase()}-${String(i).padStart(3, '0')}`, type, department, status: i <= Math.round(total * (type === 'General' ? 0.58 : type === 'ICU' ? 0.7 : type === 'Emergency' ? 0.67 : 0.5)) ? 'Occupied' : 'Available', hospitalId: 'HOSP-001' });
    await Bed.insertMany(beds);
  }
  if (!patientsN) await Patient.insertMany(Array.from({ length: 42 }, (_, i) => ({ patientId: `PT-${String(1024 + i).padStart(4, '0')}`, name: `Demo Patient ${String(i + 1).padStart(3, '0')}`, ageGroup: ['18-34', '35-54', '55-74', '75+'][i % 4], gender: ['Female', 'Male'][i % 2], department: ['Emergency', 'ICU', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Surgery'][i % 6], severity: ['Low', 'Moderate', 'High', 'Critical'][i % 4], status: 'Admitted', admissionDate: new Date(Date.now() - (i % 8) * 3600000), bedNumber: `GEN-${String(i + 1).padStart(3, '0')}`, diagnosisCategory: ['Observation', 'Cardiac', 'Respiratory', 'Injury'][i % 4], hospitalId: 'HOSP-001' })));
  if (!staffN) {
    const entries = [];
    for (let i = 1; i <= 42; i++) entries.push({ employeeId: `DOC-${String(i).padStart(3, '0')}`, name: `Demo Doctor ${i}`, role: 'Doctor', department: ['Emergency', 'ICU', 'Cardiology', 'Surgery'][i % 4], shift: ['Morning', 'Evening', 'Night'][i % 3], availability: i <= 34 ? 'On Duty' : 'Available', hospitalId: 'HOSP-001' });
    for (let i = 1; i <= 90; i++) entries.push({ employeeId: `NRS-${String(i).padStart(3, '0')}`, name: `Demo Nurse ${i}`, role: 'Nurse', department: ['Emergency', 'ICU', 'Pediatrics', 'General'][i % 4], shift: ['Morning', 'Evening', 'Night'][i % 3], availability: i <= 78 ? 'On Duty' : 'Available', hospitalId: 'HOSP-001' });
    await Staff.insertMany(entries);
  }
  if (!recordsN) await ResourceRecord.insertMany(Array.from({ length: 30 }, (_, i) => { const date = new Date(); date.setDate(date.getDate() - (29 - i)); const admissions = Math.round(116 + i * 0.45 + Math.sin(i / 3) * 8); return { date, department: 'All', totalPatients: admissions, admissions, discharges: Math.max(0, admissions - 118), availableBeds: 42, occupiedBeds: 58, availableICUBeds: 6, occupiedICUBeds: 14, hospitalId: 'HOSP-001' }; }));
  if (!await Alert.exists({ hospitalId: 'HOSP-001' })) await Alert.insertMany([{ type: 'Bed Capacity', severity: 'High', message: 'General ward occupancy is approaching the planning threshold.', resource: 'General beds', department: 'General', hospitalId: 'HOSP-001' }, { type: 'Staffing', severity: 'Medium', message: 'Review upcoming nursing coverage for the evening shift.', resource: 'Nursing staff', department: 'Emergency', hospitalId: 'HOSP-001' }]);
  const adminEmail = 'admin@careflow.com';
  if (!await User.exists({ email: adminEmail })) await User.create({ name: 'Hospital Admin', email: adminEmail, passwordHash: await bcrypt.hash('admin12345', 12), role: 'Admin', hospitalId: 'HOSP-001' });
  res.json({ success: true, message: 'Synthetic demo records are ready.', demoLogin: { email: adminEmail, password: 'admin12345' } });
}));

app.use((err, req, res, next) => {
  console.error(err);
  if (err.code === 11000) return res.status(409).json({ message: 'A record with that identifier already exists.' });
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  res.status(500).json({ message: 'The server could not complete the request.' });
});

try {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careflow', { serverSelectionTimeoutMS: 8000 });
  app.listen(port, () => console.log(`CareFlow API listening on http://localhost:${port}`));
} catch (error) {
  console.error(`MongoDB connection failed: ${error.message}`);
  process.exit(1);
}
