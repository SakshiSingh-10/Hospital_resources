import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Layers, Bed, Users, Stethoscope, HardDrive } from 'lucide-react';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('Beds');

  const tabContent = {
    Beds: { total: 100, available: 42, occupied: 58, reserved: 1, maintenance: 1 },
    ICU: { total: 20, available: 6, occupied: 14, reserved: 0, maintenance: 0 },
    Doctors: { total: 42, available: 34, occupied: 8, reserved: 0, maintenance: 0 },
    Nurses: { total: 90, available: 78, occupied: 12, reserved: 0, maintenance: 0 },
    Equipment: { total: 35, available: 28, occupied: 6, reserved: 0, maintenance: 1 }
  };

  const curr = tabContent[activeTab];

  return (
    <DashboardLayout pageTitle="Resource Management">
      <div className="space-y-6">
        
        {/* Tabs Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Hospital Resource Master Directory</h2>
          
          <div className="flex gap-2">
            {['Beds', 'ICU', 'Doctors', 'Nurses', 'Equipment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  activeTab === tab 
                    ? 'bg-teal-600 text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Breakdown Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">{activeTab} Resource Allocation Summary</h3>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              Category: {activeTab}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-500 block">Total Units</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{curr.total}</span>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs text-emerald-800 block">Available</span>
              <span className="text-2xl font-black text-emerald-900 mt-1 block">{curr.available}</span>
            </div>
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
              <span className="text-xs text-teal-800 block">Occupied / Active</span>
              <span className="text-2xl font-black text-teal-900 mt-1 block">{curr.occupied}</span>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs text-amber-800 block">Reserved</span>
              <span className="text-2xl font-black text-amber-900 mt-1 block">{curr.reserved}</span>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-300">
              <span className="text-xs text-slate-600 block">Maintenance</span>
              <span className="text-2xl font-black text-slate-700 mt-1 block">{curr.maintenance}</span>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
