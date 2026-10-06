import React from 'react';
import { Activity, ShieldCheck, HeartPulse, Building2 } from 'lucide-react';

export default function TrustIntro() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-teal-700 text-xs font-bold tracking-widest uppercase">
          <Activity className="w-3.5 h-3.5 text-teal-600" />
          Smarter Hospital Operations
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Everything You Need to Manage Hospital Capacity
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          CareFlow brings hospital resources, capacity monitoring and intelligent forecasting into one centralized platform.
        </p>

        {/* Feature badges row */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3">
            <Building2 className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-semibold text-slate-800">Multi-Dept Tracking</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3">
            <HeartPulse className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-semibold text-slate-800">Real-time Metrics</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-semibold text-slate-800">Early Warning Alerts</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3">
            <Activity className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-semibold text-slate-800">Capacity Simulation</span>
          </div>
        </div>

      </div>
    </section>
  );
}
