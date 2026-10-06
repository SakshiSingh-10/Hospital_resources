import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, ArrowRight, Bed, Users, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-teal-50/40 via-white to-slate-50/50 overflow-hidden">
      
      {/* Decorative healthcare background shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200/80 text-teal-800 text-xs font-semibold tracking-wide uppercase shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              Smart Hospital Operations
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Smarter Hospital Capacity.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                Better Resource Planning.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              CareFlow helps hospitals monitor beds, ICU capacity, staff availability and patient demand with intelligent forecasting and real-time operational insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02] text-base"
              >
                Explore Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 shadow-sm transition-all text-base"
              >
                Get Started
              </Link>
            </div>

            {/* Trust / Feature Line */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Monitor</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Predict</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Plan</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Respond</span>
            </div>
          </div>

          {/* RIGHT: Modern Healthcare Visual & Floating Card */}
          <div className="lg:col-span-6 relative">
            
            {/* Main Hospital Dashboard Preview Container */}
            <div className="relative rounded-3xl bg-slate-900/90 p-5 sm:p-6 shadow-2xl border border-slate-800 text-white">
              
              {/* Fake Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-medium text-slate-400">CareFlow Hospital Operations Center</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Status
                </div>
              </div>

              {/* Top Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Available Beds</span>
                    <Bed className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-white">42</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                  <div className="mt-2 text-[10px] text-teal-400 font-medium">58% Occupied</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>ICU Availability</span>
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-white">6</span>
                    <span className="text-xs text-slate-400">/ 20</span>
                  </div>
                  <div className="mt-2 text-[10px] text-amber-400 font-medium">70% Occupied</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Staff Available</span>
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-white">112</span>
                    <span className="text-xs text-slate-400">/ 132</span>
                  </div>
                  <div className="mt-2 text-[10px] text-emerald-400 font-medium">85% Duty Ratio</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Today's Intake</span>
                    <TrendingUp className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-white">126</span>
                    <span className="text-xs text-emerald-400 font-medium">+8.4%</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400">28 Emergency</div>
                </div>
              </div>

              {/* Mini Demand Forecast Bar Chart simulation */}
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-300">7-Day Capacity Forecast Trend</span>
                  <span className="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">ML Estimate</span>
                </div>
                <div className="h-16 flex items-end justify-between gap-1.5 pt-2">
                  {[45, 50, 58, 62, 70, 75, 82].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className={`w-full rounded-t ${idx >= 4 ? 'bg-gradient-to-t from-teal-500 to-teal-400' : 'bg-slate-600'}`} 
                        style={{ height: `${val * 0.7}%` }} 
                      />
                      <span className="text-[9px] text-slate-400">{idx < 4 ? `D-${4-idx}` : `+${idx-3}d`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* HERO FLOATING CARD (Overlapping main visual) */}
            <div className="absolute -bottom-10 -left-4 sm:-left-8 max-w-xs sm:max-w-sm w-full bg-white rounded-2xl p-4 sm:p-5 shadow-floating border border-slate-100 z-20 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h4 className="text-xs font-bold text-slate-900 tracking-wide">Hospital Capacity Overview</h4>
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  High Capacity
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Hospital Capacity Score</span>
                <span className="text-base font-extrabold text-slate-900">72 <span className="text-xs font-normal text-slate-400">/ 100</span></span>
              </div>

              {/* Progress bars for key indicators */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Bed Occupancy</span>
                    <span className="font-semibold text-slate-800">68%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>ICU Occupancy</span>
                    <span className="font-semibold text-slate-800">70%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Emergency Load</span>
                    <span className="font-semibold text-slate-800">61%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '61%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Staff Availability</span>
                    <span className="font-semibold text-slate-800">84%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
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

