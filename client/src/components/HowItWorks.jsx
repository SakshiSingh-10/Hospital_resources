import React from 'react';
import { Eye, TrendingUp, Sliders, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Monitor",
      description: "Track hospital resources, active admissions, ICU beds and staff availability in real time.",
      icon: Eye
    },
    {
      num: "02",
      title: "Predict",
      description: "Forecast upcoming patient demand and future resource requirements using machine learning models.",
      icon: TrendingUp
    },
    {
      num: "03",
      title: "Plan",
      description: "Identify potential shortages and test what-if capacity scenarios before operational surges happen.",
      icon: Sliders
    },
    {
      num: "04",
      title: "Respond",
      description: "Take informed operational actions and reallocate staff or beds before capacity becomes critical.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-teal-50/60 text-slate-900 relative overflow-hidden border-y border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-teal-700/50">
            System Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How CareFlow Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From raw operational data to proactive, decision-grade hospital planning.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-teal-200 -translate-y-8 z-0" />

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div 
                key={idx} 
                className="relative z-10 bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-teal-500/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-teal-700 font-mono tracking-wider">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

