import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Bed as BedIcon, CheckCircle, AlertCircle, Clock, Plus } from 'lucide-react';

export default function Beds() {
  const [deptFilter, setDeptFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [beds, setBeds] = useState([
    { bedNumber: 'EMG-B201', department: 'Emergency', type: 'Emergency', status: 'Occupied', patientId: 'PT-1024', lastUpdated: 'Today 09:42 AM' },
    { bedNumber: 'EMG-B202', department: 'Emergency', type: 'Emergency', status: 'Occupied', patientId: 'PT-1029', lastUpdated: 'Today 10:15 AM' },
    { bedNumber: 'EMG-B203', department: 'Emergency', type: 'Emergency', status: 'Available', patientId: null, lastUpdated: 'Today 07:00 AM' },
    { bedNumber: 'ICU-B101', department: 'ICU', type: 'ICU', status: 'Occupied', patientId: 'PT-1025', lastUpdated: 'Today 08:15 AM' },
    { bedNumber: 'ICU-B102', department: 'ICU', type: 'ICU', status: 'Available', patientId: null, lastUpdated: 'Today 06:30 AM' },
    { bedNumber: 'GEN-B401', department: 'Cardiology', type: 'General', status: 'Occupied', patientId: 'PT-1026', lastUpdated: 'Yesterday' },
    { bedNumber: 'GEN-B402', department: 'Cardiology', type: 'General', status: 'Reserved', patientId: null, lastUpdated: 'Today 09:00 AM' },
    { bedNumber: 'GEN-B403', department: 'Cardiology', type: 'General', status: 'Maintenance', patientId: null, lastUpdated: 'Oct 04' },
    { bedNumber: 'GEN-B405', department: 'Pediatrics', type: 'General', status: 'Occupied', patientId: 'PT-1027', lastUpdated: 'Yesterday' }
  ]);

  const total = 100;
  const occupied = beds.filter(b => b.status === 'Occupied').length + 50;
  const available = total - occupied - 2;
  const reserved = 1;
  const maintenance = 1;

  const filteredBeds = beds.filter(b => {
    const matchesDept = deptFilter === 'All' || b.department === deptFilter;
    const matchesType = typeFilter === 'All' || b.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesDept && matchesType && matchesStatus;
  });

  const toggleBedStatus = (bedNumber) => {
    setBeds(beds.map(b => {
      if (b.bedNumber === bedNumber) {
        const nextStatus = b.status === 'Available' ? 'Occupied' : 'Available';
        return { ...b, status: nextStatus, patientId: nextStatus === 'Occupied' ? 'PT-1030' : null };
      }
      return b;
    }));
  };

  return (
    <DashboardLayout pageTitle="Bed Management">
      <div className="space-y-6">
        
        {/* KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Total Beds</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{total}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Available Beds</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{available}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Occupied Beds</span>
            <div className="text-2xl font-black text-teal-600 mt-1">{occupied}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Reserved Beds</span>
            <div className="text-2xl font-black text-amber-600 mt-1">{reserved}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Maintenance</span>
            <div className="text-2xl font-black text-slate-500 mt-1">{maintenance}</div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
            >
              <option value="All">All Departments</option>
              <option value="Emergency">Emergency</option>
              <option value="ICU">ICU</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
            >
              <option value="All">All Bed Types</option>
              <option value="General">General</option>
              <option value="ICU">ICU</option>
              <option value="Emergency">Emergency</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <span className="text-slate-500 font-normal">Showing {filteredBeds.length} bed records</span>
        </div>

        {/* Bed Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Bed Number</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Patient ID</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4 text-right">Toggle Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredBeds.map((b) => (
                  <tr key={b.bedNumber} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{b.bedNumber}</td>
                    <td className="py-3 px-4">{b.department}</td>
                    <td className="py-3 px-4">{b.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : (
                          b.status === 'Occupied' ? 'bg-teal-100 text-teal-800' : (
                            b.status === 'Reserved' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                          )
                        )
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{b.patientId || 'Unassigned'}</td>
                    <td className="py-3 px-4 text-slate-400">{b.lastUpdated}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toggleBedStatus(b.bedNumber)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold"
                      >
                        {b.status === 'Available' ? 'Mark Occupied' : 'Mark Available'}
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
