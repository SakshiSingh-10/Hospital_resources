import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Server, BarChart3, Clock } from 'lucide-react';

export default function WhyCareFlow() {
  const points = [
    { title: "Centralized hospital resource management", desc: "Consolidate beds, ICU units, and clinical rosters into a single view." },
    { title: "Data-driven capacity planning", desc: "Replace static manual spreadsheets with automated live indicators." },
    { title: "Early shortage detection", desc: "Identify capacity deficits days before they escalate to critical levels." },
    { title: "Demand forecasting", desc: "Machine-learning models predict upcoming patient volume and bed requirements." },
    { title: "Operational risk monitoring", desc: "Continuous threshold checks alert leadership to critical department load." },
    { title: "Scenario-based planning", desc: "Evaluate what-if patient surges to test resource preparedness in advance." }
  ];

  return (
    <section id="why-careflow" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            System Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose CareFlow?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Built for modern healthcare administrators who need reliable, decision-grade operational intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:bg-teal-50/30 transition-all flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{pt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
