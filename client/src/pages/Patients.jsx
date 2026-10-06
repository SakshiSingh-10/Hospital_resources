import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Search, Plus, UserCheck, Trash2, Filter } from 'lucide-react';

export default function Patients() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [patients, setPatients] = useState([
    { id: 'PT-1024', name: 'James Wilson', ageGroup: '41-65', gender: 'Male', department: 'Emergency', emergency: true, severity: 'High', diagnosisCategory: 'Acute Respiratory Distress', lengthOfStay: 2, status: 'Admitted', bedNumber: 'EMG-B201' },
    { id: 'PT-1025', name: 'Maria Garcia', ageGroup: '65+', gender: 'Female', department: 'ICU', emergency: true, severity: 'Critical', diagnosisCategory: 'Cardiac Arrhythmia', lengthOfStay: 4, status: 'Admitted', bedNumber: 'ICU-B101' },
    { id: 'PT-1026', name: 'Robert Chen', ageGroup: '18-40', gender: 'Male', department: 'Cardiology', emergency: false, severity: 'Moderate', diagnosisCategory: 'Hypertension Evaluation', lengthOfStay: 3, status: 'Admitted', bedNumber: 'GEN-B401' },
    { id: 'PT-1027', name: 'Emma Thompson', ageGroup: '0-17', gender: 'Female', department: 'Pediatrics', emergency: false, severity: 'Low', diagnosisCategory: 'Pediatric Asthma Observation', lengthOfStay: 1, status: 'Admitted', bedNumber: 'GEN-B405' },
    { id: 'PT-1028', name: 'Liam O\'Connor', ageGroup: '41-65', gender: 'Male', department: 'Orthopedics', emergency: false, severity: 'Moderate', diagnosisCategory: 'Post-Op Knee Surgery', lengthOfStay: 5, status: 'Admitted', bedNumber: 'GEN-B409' }
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '',
    ageGroup: '18-40',
    gender: 'Male',
    department: 'Emergency',
    severity: 'Moderate',
    diagnosisCategory: 'General Observation'
  });

  const handleDischarge = (id) => {
    setPatients(patients.map(p => p.id === id ? { ...p, status: 'Discharged' } : p));
  };

  const handleDelete = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const id = `PT-${1020 + patients.length + 1}`;
    setPatients([{ ...newPatient, id, emergency: newPatient.department === 'Emergency', lengthOfStay: 1, status: 'Admitted' }, ...patients]);
    setShowAddModal(false);
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.id.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase()) || p.diagnosisCategory.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || p.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <DashboardLayout pageTitle="Patient Management">
      <div className="space-y-6">
        
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by ID, name or diagnosis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            >
              <option value="All">All Departments</option>
              <option value="Emergency">Emergency</option>
              <option value="ICU">ICU</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Admitted">Admitted</option>
              <option value="Discharged">Discharged</option>
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-xl shadow-md shadow-teal-600/20 text-xs inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Patient
            </button>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Patient ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Diagnosis</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Bed Number</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.id}</td>
                    <td className="py-3 px-4 text-slate-900 font-semibold">{p.name}</td>
                    <td className="py-3 px-4">{p.department}</td>
                    <td className="py-3 px-4 text-slate-600">{p.diagnosisCategory}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.severity === 'Critical' ? 'bg-red-100 text-red-800' : (
                          p.severity === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                        )
                      }`}>
                        {p.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{p.bedNumber || 'Unassigned'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'Admitted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {p.status === 'Admitted' && (
                        <button
                          onClick={() => handleDischarge(p.id)}
                          className="px-2.5 py-1 rounded bg-teal-50 text-teal-700 hover:bg-teal-100 text-[11px] font-semibold"
                        >
                          Discharge
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-xs font-semibold">
              <h3 className="text-base font-bold text-slate-900">Add New Patient Intake</h3>

              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div>
                  <label className="block text-slate-600 mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-sm font-semibold"
                    placeholder="Full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Department</label>
                    <select
                      value={newPatient.department}
                      onChange={(e) => setNewPatient({ ...newPatient, department: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Emergency">Emergency</option>
                      <option value="ICU">ICU</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Severity</label>
                    <select
                      value={newPatient.severity}
                      onChange={(e) => setNewPatient({ ...newPatient, severity: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Diagnosis Category</label>
                  <input
                    type="text"
                    required
                    value={newPatient.diagnosisCategory}
                    onChange={(e) => setNewPatient({ ...newPatient, diagnosisCategory: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
                  >
                    Save Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
