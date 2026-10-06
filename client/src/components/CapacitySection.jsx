import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';

export default function CapacitySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wide">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              Hospital Capacity
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Know Your Hospital Capacity Before It Becomes a Problem
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Get a clear view of current resources and understand where capacity pressure may occur across all departments, wards, and intensive care units.
            </p>

            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Unified occupancy metrics across General, ICU, and Emergency</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Dynamic stress score calculation based on live intake</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Proactive staff allocation triggers to prevent bottlenecks</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/capacity"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm"
              >
                View Capacity Dashboard
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Capacity Visualization */}
          <div className="lg:col-span-6">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Hospital Capacity Score</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Calculated from live operational indicators</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  Status: High
                </span>
              </div>

              {/* Score Display */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
                <div className="w-20 h-20 rounded-2xl bg-teal-50 border-2 border-teal-500 flex flex-col items-center justify-center text-slate-900">
                  <span className="text-3xl font-black leading-none text-teal-700">72</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">/ 100</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Elevated Stress Level</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Bed occupancy and ICU demand are approaching operational thresholds. Resource adjustments advised.
                  </p>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Bed Occupancy</span>
                    <span className="text-teal-700">68% (68 / 100 beds)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>ICU Occupancy</span>
                    <span className="text-amber-700">70% (14 / 20 beds)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Emergency Load</span>
                    <span className="text-blue-700">61% (28 active cases)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '61%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Staff Availability</span>
                    <span className="text-emerald-700">84% (112 / 132 staff on duty)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
