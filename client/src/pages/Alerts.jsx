import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Bell, AlertTriangle, ShieldAlert, CheckCircle, Check, Plus } from 'lucide-react';

export default function Alerts() {
  const [activeTab, setActiveTab] = useState('All');

  const [alerts, setAlerts] = useState([
    {
      id: 'alt-1',
      type: 'Bed Capacity Alert',
      severity: 'High',
      message: 'Bed capacity may fall below the operational threshold tomorrow. Expected demand: 92 beds (Available: 75). Potential gap: 17 beds.',
      resource: 'General Beds',
      department: 'Emergency',
      predictedDate: 'Tomorrow',
      isResolved: false
    },
    {
      id: 'alt-2',
      type: 'ICU Capacity Warning',
      severity: 'Critical',
      message: 'ICU occupancy has reached 85% (17 of 20 beds occupied). Potential ICU deficit predicted within 48 hours.',
      resource: 'ICU Beds',
      department: 'ICU',
      predictedDate: 'In 48 Hours',
      isResolved: false
    },
    {
      id: 'alt-3',
      type: 'Staff Shift Coverage Deficit',
      severity: 'Medium',
      message: 'Night shift nursing availability in Pediatrics is below optimal ratio (8 nurses available, 10 required).',
      resource: 'Nursing Staff',
      department: 'Pediatrics',
      predictedDate: 'Tonight',
      isResolved: false
    },
    {
      id: 'alt-4',
      type: 'Emergency Surge Alert',
      severity: 'Medium',
      message: 'Emergency department triage volume up 22% over baseline.',
      resource: 'Emergency Intake',
      department: 'Emergency',
      predictedDate: 'Resolved Yesterday',
      isResolved: true
    }
  ]);

  const handleResolve = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, isResolved: true } : a));
  };

  const filteredAlerts = alerts.filter(a => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Resolved') return a.isResolved;
    return !a.isResolved && a.severity === activeTab;
  });

  return (
    <DashboardLayout pageTitle="Operational Alerts">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Operational Alerts & Risk Warnings</h2>
            <p className="text-xs text-slate-500">Automated system warnings generated when capacity thresholds or staffing ratios are breached.</p>
          </div>

          <div className="flex gap-2">
            {['All', 'Critical', 'High', 'Medium', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ALERTS LIST */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200 text-xs">
              No alerts found under the "{activeTab}" filter category.
            </div>
          ) : (
            filteredAlerts.map((alt) => (
              <div
                key={alt.id}
                className={`bg-white rounded-2xl p-5 border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                  alt.isResolved ? 'opacity-60 border-slate-200 bg-slate-50/50' : (
                    alt.severity === 'Critical' ? 'border-red-300 bg-red-50/20' : (
                      alt.severity === 'High' ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                    )
                  )
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    alt.isResolved ? 'bg-slate-200 text-slate-600' : (
                      alt.severity === 'Critical' ? 'bg-red-100 text-red-700' : (
                        alt.severity === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      )
                    )
                  }`}>
                    {alt.isResolved ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{alt.type}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        alt.isResolved ? 'bg-slate-200 text-slate-700' : (
                          alt.severity === 'Critical' ? 'bg-red-100 text-red-800' : (
                            alt.severity === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          )
                        )
                      }`}>
                        {alt.isResolved ? 'Resolved' : alt.severity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">• {alt.department}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alt.message}</p>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">Timeline: {alt.predictedDate}</span>
                  </div>
                </div>

                {!alt.isResolved && (
                  <button
                    onClick={() => handleResolve(alt.id)}
                    className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Acknowledge & Resolve
                  </button>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
