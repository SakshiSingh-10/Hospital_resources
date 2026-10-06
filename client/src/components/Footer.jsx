import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Github, Linkedin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Care<span className="text-teal-400">Flow</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-Assisted Hospital Resource Availability Prediction & Capacity Planning System. Providing actionable operational foresight to hospital management.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:text-white hover:bg-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:text-white hover:bg-slate-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:text-teal-400 transition-colors">Dashboard Overview</Link></li>
              <li><Link to="/capacity" className="hover:text-teal-400 transition-colors">Capacity Forecast</Link></li>
              <li><Link to="/planning" className="hover:text-teal-400 transition-colors">Capacity Planning</Link></li>
              <li><Link to="/analytics" className="hover:text-teal-400 transition-colors">Hospital Analytics</Link></li>
              <li><Link to="/alerts" className="hover:text-teal-400 transition-colors">Operational Alerts</Link></li>
            </ul>
          </div>

          {/* Col 3: System */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/patients" className="hover:text-teal-400 transition-colors">Patient Management</Link></li>
              <li><Link to="/beds" className="hover:text-teal-400 transition-colors">Bed Roster</Link></li>
              <li><Link to="/staff" className="hover:text-teal-400 transition-colors">Staff Roster</Link></li>
              <li><Link to="/reports" className="hover:text-teal-400 transition-colors">Capacity Reports</Link></li>
            </ul>
          </div>

          {/* Col 4: Account */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-teal-400 transition-colors">Admin Login</Link></li>
              <li><Link to="/register" className="hover:text-teal-400 transition-colors">Create Account</Link></li>
              <li><Link to="/settings" className="hover:text-teal-400 transition-colors">System Settings</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar & Medical Disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              © 2026 CareFlow. All rights reserved. Final Year Computer Science Project.
            </div>
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300 font-semibold">Operational Disclaimer:</strong> CareFlow is designed for hospital operational planning and academic demonstration. Forecasts are generated using machine-learning algorithms on synthetic historical operational datasets and are not intended for clinical diagnosis, patient triage, or medical treatment decisions.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}

