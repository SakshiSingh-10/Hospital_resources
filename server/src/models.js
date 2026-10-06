import mongoose from 'mongoose';

const schema = (definition, options = {}) => new mongoose.Schema(definition, { timestamps: true, ...options });

export const Hospital = mongoose.model('Hospital', schema({
  hospitalId: { type: String, unique: true, default: 'HOSP-001' },
  hospitalName: { type: String, default: 'CareFlow Hospital' },
  location: { type: String, default: 'Central Medical District' },
  totalBeds: { type: Number, default: 100 }, totalICUBeds: { type: Number, default: 20 },
  totalEmergencyBeds: { type: Number, default: 12 }, totalIsolationBeds: { type: Number, default: 10 },
  departments: { type: [String], default: ['Emergency', 'ICU', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Surgery'] }
}));
export const User = mongoose.model('User', schema({
  name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false }, role: { type: String, enum: ['Admin', 'Staff'], default: 'Staff' }, hospitalId: { type: String, default: 'HOSP-001' }
}));
export const Patient = mongoose.model('Patient', schema({
  patientId: { type: String, required: true, unique: true }, name: { type: String, required: true }, ageGroup: String, gender: String,
  department: { type: String, required: true }, admissionDate: { type: Date, default: Date.now }, severity: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], default: 'Moderate' },
  status: { type: String, enum: ['Admitted', 'Discharged'], default: 'Admitted' }, bedNumber: String, diagnosisCategory: String, hospitalId: { type: String, default: 'HOSP-001' }
}));
export const Bed = mongoose.model('Bed', schema({
  bedNumber: { type: String, required: true, unique: true }, department: { type: String, required: true }, type: { type: String, enum: ['General', 'ICU', 'Emergency', 'Isolation'], default: 'General' },
  status: { type: String, enum: ['Available', 'Occupied', 'Reserved', 'Maintenance'], default: 'Available' }, patientId: String, hospitalId: { type: String, default: 'HOSP-001' }
}));
export const Staff = mongoose.model('Staff', schema({
  employeeId: { type: String, required: true, unique: true }, name: { type: String, required: true }, role: { type: String, enum: ['Doctor', 'Nurse', 'Technician', 'Support Staff'], required: true },
  department: String, shift: String, availability: { type: String, enum: ['On Duty', 'Available', 'On Leave'], default: 'Available' }, hospitalId: { type: String, default: 'HOSP-001' }
}));
export const ResourceRecord = mongoose.model('ResourceRecord', schema({
  date: { type: Date, required: true }, department: String, totalPatients: Number, admissions: Number, discharges: Number,
  availableBeds: Number, occupiedBeds: Number, availableICUBeds: Number, occupiedICUBeds: Number, hospitalId: { type: String, default: 'HOSP-001' }
}));
export const Prediction = mongoose.model('Prediction', schema({
  forecastPeriod: String, department: String, predictedPatients: Number, predictedBedDemand: Number, predictedICUDemand: Number,
  riskLevel: String, confidenceScore: Number, recommendation: String, timeline: [mongoose.Schema.Types.Mixed], hospitalId: { type: String, default: 'HOSP-001' }
}));
export const Alert = mongoose.model('Alert', schema({
  type: String, severity: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], default: 'Medium' }, message: String,
  resource: String, department: String, predictedDate: Date, isResolved: { type: Boolean, default: false }, hospitalId: { type: String, default: 'HOSP-001' }
}));
