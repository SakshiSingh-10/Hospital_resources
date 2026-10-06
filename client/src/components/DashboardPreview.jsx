import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Bed, Activity, Bell, Shield, TrendingUp, ChevronRight, Search } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            Unified Interface
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            One Dashboard. Complete Hospital Visibility.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Monitor patients, beds, ICU capacity, staff availability, departments and operational risks from one centralized dashboard.
          </p>
        </div>

        {/* Dashboard Mockup Frame */}
        <div className="rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Top Bar Mockup */}
          <div className="bg-slate-900 px-6 py-3.5 flex items-center justify-between text-white border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-sm">
                CF
              </div>
              <span className="font-bold text-sm tracking-wide">CareFlow Hospital Overview</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700">
                Hospital ID: HOSP-001
              </span>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-teal-400" />
                <span className="font-medium text-white">Admin User</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout Split */}
          <div className="grid grid-cols-12 min-h-[460px]">
            
            {/* Sidebar Mockup */}
            <div className="hidden lg:block lg:col-span-3 bg-slate-900/95 text-slate-300 p-5 border-r border-slate-800 space-y-6 text-xs">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Main Menu</div>
                <div className="space-y-1">
                  <div className="px-3 py-2 rounded-lg bg-teal-600 text-white font-semibold flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </div>
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-slate-400" /> Patients
                  </div>
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2.5">
                    <Bed className="w-4 h-4 text-slate-400" /> Bed Management
                  </div>
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-slate-400" /> ICU Capacity
                  </div>
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-slate-400" /> Staff Roster
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Planning & AI</div>
                <div className="space-y-1">
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-teal-400" /> Capacity Forecast
                  </div>
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-amber-400" /> Operational Alerts
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="col-span-12 lg:col-span-9 p-6 bg-slate-50 space-y-6">
              
              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-medium">Available Beds</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">42 <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
                  <span className="text-[10px] font-semibold text-teal-600">58% Occupied</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-medium">ICU Availability</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">6 <span className="text-xs text-slate-400 font-normal">/ 20</span></div>
                  <span className="text-[10px] font-semibold text-amber-600">70% Occupied</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-medium">Today's Intake</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">126</div>
                  <span className="text-[10px] font-semibold text-emerald-600">+8.4% Admissions</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-500 font-medium">Doctors On Duty</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">34 <span className="text-xs text-slate-400 font-normal">/ 42</span></div>
                  <span className="text-[10px] font-semibold text-slate-500">81% Active Roster</span>
                </div>
              </div>

              {/* Department Capacity Table Preview */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Department Capacity Status</h4>
                  <Link to="/dashboard" className="text-xs text-teal-600 font-semibold hover:underline flex items-center gap-1">
                    Open Full System <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Department</th>
                        <th className="py-2.5 px-3">Patients</th>
                        <th className="py-2.5 px-3">Beds</th>
                        <th className="py-2.5 px-3">Occupancy</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">Emergency</td>
                        <td className="py-2.5 px-3">42</td>
                        <td className="py-2.5 px-3">50</td>
                        <td className="py-2.5 px-3 font-medium">84%</td>
                        <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">High</span></td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">ICU</td>
                        <td className="py-2.5 px-3">17</td>
                        <td className="py-2.5 px-3">20</td>
                        <td className="py-2.5 px-3 font-medium">85%</td>
                        <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">High</span></td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">Cardiology</td>
                        <td className="py-2.5 px-3">24</td>
                        <td className="py-2.5 px-3">40</td>
                        <td className="py-2.5 px-3 font-medium">60%</td>
                        <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Normal</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
