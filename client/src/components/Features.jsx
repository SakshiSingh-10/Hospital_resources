import React from 'react';
import { Bed, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Features() {
  const cards = [
    {
      icon: Bed,
      title: "Bed Management",
      description: "Monitor available, occupied and reserved beds across hospital departments in real time.",
      badge: "Real-time Tracking"
    },
    {
      icon: Users,
      title: "Staff Availability",
      description: "Track doctor and nursing staff availability to support better operational planning and shift allocation.",
      badge: "Workforce Roster"
    },
    {
      icon: TrendingUp,
      title: "Demand Forecasting",
      description: "Forecast upcoming patient demand and identify potential resource gaps using historical operational data.",
      badge: "Predictive Intelligence"
    },
    {
      icon: AlertTriangle,
      title: "Smart Alerts",
      description: "Receive early warnings about capacity pressure, staffing shortages and operational bottlenecks before they impact care.",
      badge: "Early Risk Detection"
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 inline-block px-3 py-1 rounded-full border border-teal-100">
            Core Capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Hospital Operations & Clinical Leadership
          </h3>
          <p className="text-slate-600 text-base sm:text-lg">
            Streamline resource allocation and capacity decisions across every department.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-sm">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>

                  <span className="text-[11px] font-bold text-teal-700 tracking-wide uppercase bg-teal-50 px-2.5 py-0.5 rounded-md inline-block mb-3">
                    {card.badge}
                  </span>

                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                    {card.title}
                  </h4>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
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
