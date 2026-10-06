import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { User, ShieldCheck, Mail, Building2, Key } from 'lucide-react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('careflow_user') || '{"name":"Hospital Admin","email":"admin@careflow.com","role":"Admin"}');

  return (
    <DashboardLayout pageTitle="User Profile">
      <div className="max-w-3xl space-y-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-teal-400 font-bold text-2xl flex items-center justify-center shadow-md">
            {user.name ? user.name.charAt(0) : 'A'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user.name || 'Hospital Administrator'}</h2>
            <p className="text-xs text-slate-500">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold">
              Role: {user.role || 'Admin'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs font-semibold">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> Account & Security Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1">Full Name</label>
              <input type="text" value={user.name || 'Hospital Admin'} disabled className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold" />
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Email Address</label>
              <input type="email" value={user.email || 'admin@careflow.com'} disabled className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold" />
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Hospital Designation</label>
              <input type="text" value="CareFlow Hospital Operations Director" disabled className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold" />
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Hospital ID</label>
              <input type="text" value="HOSP-001" disabled className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold" />
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
