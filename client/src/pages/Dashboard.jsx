import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Bed, Activity, TrendingUp, Users, AlertCircle, ArrowUpRight, CheckCircle, ShieldAlert } from 'lucide-react';
import { hospitalAPI } from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hospitalAPI.getSummary().then(res => {
      setData(res.hospital);
      setLoading(false);
    });
  }, []);

  const kpis = [
    { label: 'Available Beds', val: data?.availableBeds || 42, total: data?.totalBeds || 100, pct: '58% occupied', icon: Bed, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'ICU Availability', val: data?.availableICUBeds || 6, total: data?.totalICUBeds || 20, pct: '70% occupied', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: "Today's Admissions", val: data?.todaysAdmissions || 126, sub: '+8.4% intake', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Emergency Cases', val: data?.emergencyCases || 28, sub: 'Active Intake', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Doctors Available', val: data?.availableDoctors || 34, total: data?.totalDoctors || 42, sub: 'On Duty', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Nurses Available', val: data?.availableNurses || 78, total: data?.totalNurses || 90, sub: 'On Duty', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ];

  return (
    <DashboardLayout pageTitle="Hospital Overview">
      <div className="space-y-8">
        
        {/* Page Header Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Hospital Capacity & Resources</h2>
            <p className="text-xs text-slate-500">Monitor current hospital capacity and operational resources in real-time.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Capacity Stress Score:</span>
            <span className="text-sm font-extrabold text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              72 / 100 (High)
            </span>
          </div>
        </div>

        {/* 6 KPI CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi, idx) => {
            const IconComponent = kpi.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">{kpi.label}</span>
                    <div className={`w-8 h-8 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 mt-2">
                    {kpi.val} {kpi.total && <span className="text-xs text-slate-400 font-normal">/ {kpi.total}</span>}
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-slate-600 mt-3 pt-2 border-t border-slate-100">
                  {kpi.pct || kpi.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* CURRENT CAPACITY PROGRESS BARS SECTION (Section 15) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Current Hospital Capacity</h3>
            <span className="text-xs text-slate-500">Live Bed Allocation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">General Beds</span>
                <span className="font-extrabold text-teal-700">58 / 100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: '58%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Occupancy: 58%</span>
                <span className="text-emerald-700 font-bold">Status: Normal</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">ICU Beds</span>
                <span className="font-extrabold text-amber-700">14 / 20</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '70%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Occupancy: 70%</span>
                <span className="text-amber-700 font-bold">Status: Moderate</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Emergency Beds</span>
                <span className="font-extrabold text-red-700">8 / 12</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '66.7%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Occupancy: 67%</span>
                <span className="text-amber-700 font-bold">Status: High</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Isolation Beds</span>
                <span className="font-extrabold text-blue-700">5 / 10</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '50%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Occupancy: 50%</span>
                <span className="text-emerald-700 font-bold">Status: Normal</span>
              </div>
            </div>

          </div>
        </div>

        {/* TABLES GRID: Recent Patients & Department Capacity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Patient Activity Table (Section 16) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Recent Patient Activity</h3>
              <Link to="/patients" className="text-xs font-semibold text-teal-600 hover:underline">
                View All Patients →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Patient ID</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Severity</th>
                    <th className="py-2.5 px-3">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">PT-1024</td>
                    <td className="py-2.5 px-3">Emergency</td>
                    <td className="py-2.5 px-3 text-slate-500">09:42 AM</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Admitted</span></td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">High</span></td>
                    <td className="py-2.5 px-3 text-slate-500">2 days</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">PT-1025</td>
                    <td className="py-2.5 px-3">ICU</td>
                    <td className="py-2.5 px-3 text-slate-500">08:15 AM</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Admitted</span></td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">Critical</span></td>
                    <td className="py-2.5 px-3 text-slate-500">4 days</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">PT-1026</td>
                    <td className="py-2.5 px-3">Cardiology</td>
                    <td className="py-2.5 px-3 text-slate-500">Yesterday</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Admitted</span></td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Moderate</span></td>
                    <td className="py-2.5 px-3 text-slate-500">3 days</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">PT-1027</td>
                    <td className="py-2.5 px-3">Pediatrics</td>
                    <td className="py-2.5 px-3 text-slate-500">Yesterday</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Admitted</span></td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold">Low</span></td>
                    <td className="py-2.5 px-3 text-slate-500">1 day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Department Capacity Table (Section 17) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Department Capacity</h3>
              <span className="text-xs text-slate-500">Live Department Metrics</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Patients</th>
                    <th className="py-2.5 px-3">Beds</th>
                    <th className="py-2.5 px-3">Occupancy</th>
                    <th className="py-2.5 px-3">Staff</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">Emergency</td>
                    <td className="py-2.5 px-3">42</td>
                    <td className="py-2.5 px-3">50</td>
                    <td className="py-2.5 px-3 font-bold text-amber-700">84%</td>
                    <td className="py-2.5 px-3">12</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">High</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">ICU</td>
                    <td className="py-2.5 px-3">17</td>
                    <td className="py-2.5 px-3">20</td>
                    <td className="py-2.5 px-3 font-bold text-amber-700">85%</td>
                    <td className="py-2.5 px-3">18</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">High</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">Cardiology</td>
                    <td className="py-2.5 px-3">24</td>
                    <td className="py-2.5 px-3">40</td>
                    <td className="py-2.5 px-3">60%</td>
                    <td className="py-2.5 px-3">14</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Normal</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">Orthopedics</td>
                    <td className="py-2.5 px-3">18</td>
                    <td className="py-2.5 px-3">30</td>
                    <td className="py-2.5 px-3">60%</td>
                    <td className="py-2.5 px-3">10</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Normal</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">Pediatrics</td>
                    <td className="py-2.5 px-3">16</td>
                    <td className="py-2.5 px-3">25</td>
                    <td className="py-2.5 px-3">64%</td>
                    <td className="py-2.5 px-3">9</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Normal</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
