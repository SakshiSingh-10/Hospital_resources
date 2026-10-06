import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ForecastSection() {
  const chartData = [
    { day: 'Day -6', Historical: 110, Forecast: null },
    { day: 'Day -5', Historical: 114, Forecast: null },
    { day: 'Day -4', Historical: 118, Forecast: null },
    { day: 'Day -3', Historical: 122, Forecast: null },
    { day: 'Day -2', Historical: 120, Forecast: null },
    { day: 'Day -1', Historical: 125, Forecast: null },
    { day: 'Today', Historical: 126, Forecast: 126 },
    { day: '+1 Day', Historical: null, Forecast: 129 },
    { day: '+2 Days', Historical: null, Forecast: 132 },
    { day: '+3 Days', Historical: null, Forecast: 135 },
    { day: '+5 Days', Historical: null, Forecast: 138 },
    { day: '+7 Days', Historical: null, Forecast: 142 }
  ];

  return (
    <section id="forecasting" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Text & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wide">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
              Machine-Learning Analytics
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Intelligent Capacity Forecasting
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Use historical hospital data to understand expected patient demand and prepare beds, ICU units, and staffing in advance.
            </p>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Confidence</span>
                <div className="text-xl font-extrabold text-teal-700 mt-0.5">92%</div>
                <span className="text-[10px] text-slate-400">R² Score</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Demand Growth</span>
                <div className="text-xl font-extrabold text-teal-700 mt-0.5">+14%</div>
                <span className="text-[10px] text-slate-400">Next 7 Days</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <span className="text-[10px] font-bold text-amber-800 uppercase">Resource Gap</span>
                <div className="text-xl font-extrabold text-amber-800 mt-0.5">8 Beds</div>
                <span className="text-[10px] text-amber-600">Action Advised</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 pt-1">
              *Forecast values are calculated by machine-learning regression models based on past admission trends and seasonal indicators.
            </p>
          </div>

          {/* RIGHT: Recharts Forecast Chart */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Patient Demand Forecast</h3>
                <p className="text-xs text-slate-500">Comparing past 7 days against 7-day model projections</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-100 text-teal-800 border border-teal-200">
                RandomForest Model
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[90, 160]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="Historical" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Historical Intake" />
                  <Line type="monotone" dataKey="Forecast" stroke="#0284c7" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} name="Forecast Projection" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
