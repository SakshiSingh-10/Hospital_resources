import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Settings as SettingsIcon, Building2, Bell, Shield, Cpu, Save } from 'lucide-react';

export default function Settings() {
  const [hospName, setHospName] = useState('CareFlow Hospital');
  const [location, setLocation] = useState('Central Medical District, Metropolitan Campus');
  const [totalBeds, setTotalBeds] = useState(100);
  const [totalICU, setTotalICU] = useState(20);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg('Settings saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <DashboardLayout pageTitle="System Settings">
      <div className="space-y-8 max-w-4xl">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Hospital & System Preferences</h2>
            <p className="text-xs text-slate-500">Configure hospital parameters, notifications, and forecast model settings.</p>
          </div>
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {savedMsg}
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Hospital Info Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-600" /> Hospital Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 mb-1">Hospital Name</label>
                <input
                  type="text"
                  value={hospName}
                  onChange={(e) => setHospName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Location Campus</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Total General Beds</label>
                <input
                  type="number"
                  value={totalBeds}
                  onChange={(e) => setTotalBeds(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Total ICU Beds</label>
                <input
                  type="number"
                  value={totalICU}
                  onChange={(e) => setTotalICU(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Forecast Settings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-teal-600" /> Forecast & Alert Model Settings
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-bold text-slate-900 block">Bed Occupancy Alert Threshold</span>
                  <span className="text-slate-500 text-[11px]">Generate warning alert when bed occupancy exceeds percentage</span>
                </div>
                <span className="font-bold text-teal-700">80%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-bold text-slate-900 block">ICU Alert Threshold</span>
                  <span className="text-slate-500 text-[11px]">Generate warning alert when ICU occupancy exceeds percentage</span>
                </div>
                <span className="font-bold text-amber-700">75%</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-teal-600/20 text-xs inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>

        </form>

      </div>
    </DashboardLayout>
  );
}
