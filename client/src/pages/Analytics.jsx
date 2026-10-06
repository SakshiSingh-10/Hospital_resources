import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Calendar, Filter } from 'lucide-react';

export default function Analytics() {
  const [range, setRange] = useState('30');
  const [dept, setDept] = useState('All');

  const admissionsData = [
    { date: 'Sep 30', Admissions: 112, Discharges: 105 },
    { date: 'Oct 01', Admissions: 118, Discharges: 110 },
    { date: 'Oct 02', Admissions: 124, Discharges: 115 },
    { date: 'Oct 03', Admissions: 120, Discharges: 118 },
    { date: 'Oct 04', Admissions: 129, Discharges: 121 },
    { date: 'Oct 05', Admissions: 132, Discharges: 125 },
    { date: 'Oct 06', Admissions: 126, Discharges: 120 }
  ];

  const bedOccupancyData = [
    { date: 'Sep 30', General: 52, ICU: 12, Emergency: 7 },
    { date: 'Oct 01', General: 54, ICU: 13, Emergency: 8 },
    { date: 'Oct 02', General: 56, ICU: 14, Emergency: 9 },
    { date: 'Oct 03', General: 55, ICU: 13, Emergency: 8 },
    { date: 'Oct 04', General: 57, ICU: 15, Emergency: 10 },
    { date: 'Oct 05', General: 58, ICU: 14, Emergency: 9 },
    { date: 'Oct 06', General: 58, ICU: 14, Emergency: 8 }
  ];

  const waitTimeData = [
    { date: 'Sep 30', Minutes: 32 },
    { date: 'Oct 01', Minutes: 35 },
    { date: 'Oct 02', Minutes: 38 },
    { date: 'Oct 03', Minutes: 36 },
    { date: 'Oct 04', Minutes: 42 },
    { date: 'Oct 05', Minutes: 40 },
    { date: 'Oct 06', Minutes: 39 }
  ];

  const predVsActual = [
    { date: 'Day -6', Actual: 112, Predicted: 115 },
    { date: 'Day -5', Actual: 118, Predicted: 120 },
    { date: 'Day -4', Actual: 124, Predicted: 122 },
    { date: 'Day -3', Actual: 120, Predicted: 124 },
    { date: 'Day -2', Actual: 129, Predicted: 128 },
    { date: 'Day -1', Actual: 132, Predicted: 130 },
    { date: 'Today', Actual: 126, Predicted: 127 }
  ];

  const deptOccupancy = [
    { name: 'Emergency', value: 42, color: '#0d9488' },
    { name: 'ICU', value: 17, color: '#f59e0b' },
    { name: 'Cardiology', value: 24, color: '#2563eb' },
    { name: 'Orthopedics', value: 18, color: '#10b981' },
    { name: 'Pediatrics', value: 16, color: '#8b5cf6' },
    { name: 'Surgery', value: 20, color: '#ec4899' }
  ];

  return (
    <DashboardLayout pageTitle="Hospital Analytics">
      <div className="space-y-8">
        
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Hospital Operational Analytics</h2>
            <p className="text-xs text-slate-500 font-medium">Analyze historical throughput, resource utilization, and forecasting accuracy.</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>

            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            >
              <option value="All">All Departments</option>
              <option value="Emergency">Emergency</option>
              <option value="ICU">ICU</option>
            </select>
          </div>
        </div>

        {/* 8 CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Patient Admissions vs Discharges */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">1. Patient Admissions vs Discharges</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={admissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="Admissions" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Discharges" fill="#64748b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Bed Occupancy Trend */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">2. Bed Occupancy Trend by Unit</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bedOccupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="General" stroke="#0f766e" strokeWidth={2} />
                  <Line type="monotone" dataKey="ICU" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="Emergency" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: ICU Utilization */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">3. ICU Utilization Rate</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bedOccupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 20]} tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="ICU" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Occupied ICU Beds" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Average Waiting Time */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">4. Average Patient Wait Time (Mins)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waitTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="Minutes" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 5: Predicted vs Actual Demand */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">5. Predicted vs Actual Patient Intake</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predVsActual}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="Actual" stroke="#0f766e" strokeWidth={2} />
                  <Line type="monotone" dataKey="Predicted" stroke="#0284c7" strokeDasharray="4 4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 6: Department Occupancy Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">6. Department Patient Load Breakdown</h3>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deptOccupancy} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {deptOccupancy.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
