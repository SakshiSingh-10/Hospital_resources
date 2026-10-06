import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, ShieldAlert } from 'lucide-react';

export default function ICU() {
  const hourlyData = [
    { hour: '00:00', occupancy: 65 },
    { hour: '03:00', occupancy: 70 },
    { hour: '06:00', occupancy: 72 },
    { hour: '09:00', occupancy: 85 },
    { hour: '12:00', occupancy: 80 },
    { hour: '15:00', occupancy: 75 },
    { hour: '18:00', occupancy: 88 },
    { hour: '21:00', occupancy: 82 }
  ];

  return (
    <DashboardLayout pageTitle="ICU Management">
      <div className="space-y-8">
        
        {/* KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Total ICU Beds</span>
            <div className="text-2xl font-black text-slate-900 mt-1">20</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Occupied ICU</span>
            <div className="text-2xl font-black text-amber-600 mt-1">14</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Available ICU</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">6</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Reserved ICU</span>
            <div className="text-2xl font-black text-slate-500 mt-1">0</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-xs">
            <span className="text-xs text-amber-800 font-medium">Occupancy Rate</span>
            <div className="text-2xl font-black text-amber-900 mt-1">70%</div>
          </div>
        </div>

        {/* Hourly Utilization Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">24-Hour ICU Utilization Trend</h3>
              <p className="text-xs text-slate-500">Hourly percentage load across Intensive Care Units</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Moderate Surge
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: '12px' }} />
                <Bar dataKey="occupancy" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Occupancy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
