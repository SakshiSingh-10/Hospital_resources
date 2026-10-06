import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sliders, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function SimulationPreview() {
  const [patientInc, setPatientInc] = useState(20);
  const [extraBeds, setExtraBeds] = useState(10);
  const [extraDocs, setExtraDocs] = useState(5);
  const [extraNurses, setExtraNurses] = useState(8);

  const projectedPatients = Math.round(120 * (1 + patientInc / 100));
  const bedReq = Math.round(75 * (1 + patientInc / 100));
  const availableTotal = 100 + parseInt(extraBeds);
  const gap = Math.max(0, bedReq - availableTotal);
  const score = Math.min(100, Math.round(68 + patientInc * 0.4 - extraBeds * 0.5));

  let status = 'Normal';
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (score >= 85 || gap > 10) {
    status = 'Critical';
    badgeColor = 'bg-red-100 text-red-800 border-red-200';
  } else if (score >= 75 || gap > 0) {
    status = 'Moderate Risk';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
  }

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
            What-If Scenario Planning
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Plan Before Demand Changes
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Test different patient surge scenarios and evaluate their possible operational impact in seconds.
          </p>
        </div>

        {/* Interactive Visual Simulator Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-teal-600" />
              Adjust Simulation Parameters
            </h3>

            {/* Range Slider 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-slate-700">
                <span>Expected Patient Volume Increase</span>
                <span className="text-teal-700 font-mono font-bold">+{patientInc}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={patientInc}
                onChange={(e) => setPatientInc(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            {/* Grid of Sliders/Inputs */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Add Beds</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={extraBeds}
                  onChange={(e) => setExtraBeds(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 text-center focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Add Doctors</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={extraDocs}
                  onChange={(e) => setExtraDocs(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 text-center focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Add Nurses</label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={extraNurses}
                  onChange={(e) => setExtraNurses(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 text-center focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>
          </div>

          {/* Simulation Result Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-5 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Projected Outcome</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                {status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-400">Projected Patients</span>
                <span className="text-lg font-bold text-white">{projectedPatients}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-400">Projected Bed Demand</span>
                <span className="text-lg font-bold text-white">{bedReq} beds</span>
              </div>
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-400">Resource Gap</span>
                <span className={`text-lg font-bold ${gap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {gap > 0 ? `${gap} beds shortage` : 'Capacity Sufficient'}
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-400">Capacity Stress Index</span>
                <span className="text-lg font-bold text-teal-400">{score} / 100</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/planning"
                className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-all"
              >
                Run Full Capacity Simulation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
