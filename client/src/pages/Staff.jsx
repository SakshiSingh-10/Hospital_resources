import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Users, Stethoscope, Clock, ShieldCheck, Plus, Search } from 'lucide-react';

export default function Staff() {
  const [roleFilter, setRoleFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');

  const [staffList, setStaffList] = useState([
    { employeeId: 'DOC-101', name: 'Dr. Aris Vance', role: 'Doctor', department: 'Emergency', shift: 'Morning', availability: 'On Duty', status: 'Active' },
    { employeeId: 'DOC-102', name: 'Dr. Elena Rostova', role: 'Doctor', department: 'ICU', shift: 'Morning', availability: 'On Duty', status: 'Active' },
    { employeeId: 'DOC-103', name: 'Dr. Marcus Thorne', role: 'Doctor', department: 'Cardiology', shift: 'Evening', availability: 'Available', status: 'Active' },
    { employeeId: 'NRS-201', name: 'Nurse Sarah Jenkins', role: 'Nurse', department: 'Emergency', shift: 'Morning', availability: 'On Duty', status: 'Active' },
    { employeeId: 'NRS-202', name: 'Nurse David Miller', role: 'Nurse', department: 'ICU', shift: 'Night', availability: 'On Duty', status: 'Active' },
    { employeeId: 'TEC-301', name: 'Alex Rivera', role: 'Technician', department: 'Radiology', shift: 'Morning', availability: 'On Duty', status: 'Active' },
    { employeeId: 'SUP-401', name: 'Maria Torres', role: 'Support Staff', department: 'General', shift: 'Morning', availability: 'On Duty', status: 'Active' }
  ]);

  const toggleAvailability = (id) => {
    setStaffList(staffList.map(s => {
      if (s.employeeId === id) {
        return { ...s, availability: s.availability === 'On Duty' ? 'On Leave' : 'On Duty' };
      }
      return s;
    }));
  };

  const filteredStaff = staffList.filter(s => {
    const matchesRole = roleFilter === 'All' || s.role === roleFilter;
    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    return matchesRole && matchesDept;
  });

  return (
    <DashboardLayout pageTitle="Staff Roster Management">
      <div className="space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Doctors</span>
            <div className="text-2xl font-black text-slate-900 mt-1">34 <span className="text-xs text-slate-400 font-normal">/ 42 On Duty</span></div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Nurses</span>
            <div className="text-2xl font-black text-teal-600 mt-1">78 <span className="text-xs text-slate-400 font-normal">/ 90 On Duty</span></div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Technicians</span>
            <div className="text-2xl font-black text-slate-900 mt-1">15</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Support Staff</span>
            <div className="text-2xl font-black text-slate-900 mt-1">20</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
            >
              <option value="All">All Roles</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Technician">Technician</option>
              <option value="Support Staff">Support Staff</option>
            </select>

            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
            >
              <option value="All">All Departments</option>
              <option value="Emergency">Emergency</option>
              <option value="ICU">ICU</option>
              <option value="Cardiology">Cardiology</option>
            </select>
          </div>

          <span className="text-slate-500 font-normal">Total Roster: {filteredStaff.length} members</span>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Employee ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Shift</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredStaff.map((s) => (
                  <tr key={s.employeeId} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{s.employeeId}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{s.name}</td>
                    <td className="py-3 px-4">{s.role}</td>
                    <td className="py-3 px-4">{s.department}</td>
                    <td className="py-3 px-4 text-slate-600">{s.shift}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.availability === 'On Duty' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {s.availability}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleAvailability(s.employeeId)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold"
                      >
                        Toggle Duty
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
