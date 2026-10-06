import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { AlertCircle, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';

export default function Bottlenecks() {
  const bottlenecks = [
    {
      department: 'Emergency Department',
      status: 'High Surge',
      issue: 'High emergency volume (28 active cases) combined with limited immediate bed availability.',
      suggestion: 'Review available general ward capacity and adjust upcoming nursing shift coverage.',
      impact: 'Wait time elevated to 39 mins'
    },
    {
      department: 'Intensive Care Unit (ICU)',
      status: 'Critical Threshold',
      issue: 'ICU bed occupancy has reached 85% (17 of 20 beds occupied). Only 3 emergency ICU beds open.',
      suggestion: 'Identify candidates in step-down care for transfer to cardiology or general ward.',
      impact: 'ICU deficit predicted within 48h'
    },
    {
      department: 'Pediatrics Nursing Roster',
      status: 'Staffing Deficit',
      issue: 'Night shift nursing availability is below the 1:4 nurse-to-patient operational standard.',
      suggestion: 'Reallocate 2 float pool nurses to Pediatrics night shift.',
      impact: 'Staff ratio below threshold'
    }
  ];

  return (
    <DashboardLayout pageTitle="Bottleneck Analysis">
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">Hospital Operational Bottlenecks</h2>
          <p className="text-xs text-slate-500">Automated identification of capacity constraints, long wait times, and staffing deficits.</p>
        </div>

        <div className="space-y-4">
          {bottlenecks.map((b, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">{b.department}</h3>
                </div>
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  {b.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block">Possible Operational Issue:</span>
                  <p className="text-slate-600 font-medium mt-0.5">{b.issue}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200/80 text-teal-900">
                  <div className="flex items-center gap-1.5 font-bold text-[11px] text-teal-800 uppercase mb-1">
                    <Cpu className="w-3.5 h-3.5 text-teal-600" />
                    AI-generated operational planning suggestion
                  </div>
                  <p className="font-medium text-xs text-slate-800">{b.suggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
