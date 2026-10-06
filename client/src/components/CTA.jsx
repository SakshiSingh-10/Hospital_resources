import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white relative overflow-hidden">
      
      {/* Subtle decorative medical cross grid background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-600/60 border border-teal-400/30 text-teal-100 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-teal-300" />
          Transform Hospital Resource Operations
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to Manage Hospital Capacity Smarter?
        </h2>

        <p className="text-teal-100 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Monitor resources, understand demand and plan ahead with CareFlow's centralized capacity management platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-teal-900 hover:bg-teal-50 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all text-base"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 text-teal-700" />
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-900/60 hover:bg-teal-900 text-white font-semibold px-8 py-3.5 rounded-xl border border-teal-500/40 transition-all text-base"
          >
            Explore Dashboard
          </Link>
        </div>

      </div>
    </section>
  );
}
