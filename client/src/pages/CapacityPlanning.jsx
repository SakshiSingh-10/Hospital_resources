import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Sliders, RefreshCw, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { simulationAPI } from '../services/api';

export default function CapacityPlanning() {
  const [patientInc, setPatientInc] = useState(20);
  const [beds, setBeds] = useState(100);
  const [icuBeds, setIcuBeds] = useState(20);
  const [doctors, setDoctors] = useState(34);
  const [nurses, setNurses] = useState(78);
  const [emergencyCases, setEmergencyCases] = useState(28);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    projectedPatients: 144,
    projectedBeds: 90,
    projectedICU: 18,
    requiredDoctors: 16,
    requiredNurses: 41,
    resourceGap: { bedGap: 0, icuGap: 0, doctorGap: 0, nurseGap: 0, totalGap: 0 },
    operationalStatus: 'Moderate',
    summary: 'With a 20% surge in volume, hospital will require 90 beds and 18 ICU beds. Existing resources are sufficient with moderate stress.'
  });

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await simulationAPI.runSimulation({
        patientIncreasePct: patientInc,
        availableBeds: beds,
        availableICUBeds: icuBeds,
        doctors,
        nurses,
        emergencyCases
      });
      if (res.simulation) {
        setResult(res.simulation);
      }
    } catch (err) {
      console.warn('Simulation local fallback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Capacity Planning">
      <div className="space-y-8">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
          <h2 className="text-xl font-bold text-slate-900">What-If Capacity Planning Simulator</h2>
          <p className="text-xs text-slate-500">Evaluate possible changes in patient volume and available resources to test hospital operational readiness.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Input Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-teal-600" />
              Adjust Operational Parameters
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Expected Patient Intake Surge</span>
                <span className="text-teal-700 font-mono font-bold">+{patientInc}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={patientInc}
                onChange={(e) => setPatientInc(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 mb-1">Available General Beds</label>
                <input
                  type="number"
                  value={beds}
                  onChange={(e) => setBeds(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Available ICU Beds</label>
                <input
                  type="number"
                  value={icuBeds}
                  onChange={(e) => setIcuBeds(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Doctors On Duty</label>
                <input
                  type="number"
                  value={doctors}
                  onChange={(e) => setDoctors(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Nurses On Duty</label>
                <input
                  type="number"
                  value={nurses}
                  onChange={(e) => setNurses(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-teal-600/20 text-xs inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>

          {/* Right: Simulation Result (Section 39) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simulation Output</h3>
                <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${
                  result.operationalStatus === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/40' : (
                    result.operationalStatus === 'High' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  )
                }`}>
                  Status: {result.operationalStatus}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Projected Patients</span>
                  <span className="text-sm font-bold text-white">{result.projectedPatients}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Bed Requirement</span>
                  <span className="text-sm font-bold text-white">{result.projectedBeds} beds</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">ICU Requirement</span>
                  <span className="text-sm font-bold text-white">{result.projectedICU} beds</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Required Doctors</span>
                  <span className="text-sm font-bold text-white">{result.requiredDoctors}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Required Nurses</span>
                  <span className="text-sm font-bold text-white">{result.requiredNurses}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Resource Deficit</span>
                  <span className={`text-sm font-extrabold ${result.resourceGap.bedGap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {result.resourceGap.bedGap > 0 ? `${result.resourceGap.bedGap} Beds Gap` : 'No Deficit'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <p className="leading-relaxed font-normal">{result.summary}</p>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
