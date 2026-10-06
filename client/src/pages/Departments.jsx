import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Building2, Bed, Users, Activity, ChevronRight } from 'lucide-react';

export default function Departments() {
  const depts = [
    { name: 'Emergency', patients: 42, beds: 50, occupancy: 84, staff: 12, status: 'High' },
    { name: 'ICU', patients: 17, beds: 20, occupancy: 85, staff: 18, status: 'High' },
    { name: 'Cardiology', patients: 24, beds: 40, occupancy: 60, staff: 14, status: 'Normal' },
    { name: 'Orthopedics', patients: 18, beds: 30, occupancy: 60, staff: 10, status: 'Normal' },
    { name: 'Pediatrics', patients: 16, beds: 25, occupancy: 64, staff: 9, status: 'Normal' },
    { name: 'Surgery', patients: 20, beds: 35, occupancy: 57, staff: 16, status: 'Normal' }
  ];

  return (
    <DashboardLayout pageTitle="Department Capacity">
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">Hospital Department Capacity</h2>
          <p className="text-xs text-slate-500">Departmental patient load, bed allocation, and staffing distribution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {depts.map((d, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-teal-300 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{d.name}</h3>
                    <span className="text-[11px] text-slate-500 font-medium">Department Unit</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  d.status === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {d.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Active Patients</span>
                  <span className="text-base font-bold text-slate-900">{d.patients}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Total Beds</span>
                  <span className="text-base font-bold text-slate-900">{d.beds}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Occupancy Rate</span>
                  <span className="text-base font-bold text-teal-700">{d.occupancy}%</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Staff On Duty</span>
                  <span className="text-base font-bold text-slate-900">{d.staff}</span>
                </div>
              </div>

              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors">
                View Department
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
