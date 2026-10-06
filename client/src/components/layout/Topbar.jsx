import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function Topbar({ setMobileOpen, pageTitle }) {
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('careflow_user') || '{"name":"Hospital Admin","role":"Admin"}');

  const handleLoadDemoData = async () => {
    setSeeding(true);
    setSeedMsg('');
    try {
      await axios.post('/api/seed');
      setSeedMsg('Demo Data Loaded!');
      setTimeout(() => setSeedMsg(''), 3000);
      window.location.reload();
    } catch (err) {
      setSeedMsg(err.response?.data?.message || 'Could not connect to the backend.');
      setTimeout(() => setSeedMsg(''), 3000);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      
      {/* Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            {pageTitle || 'Hospital Overview'}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            CareFlow Operations Platform • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Right Actions & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Load Demo Data Button (Section 55 Requirement) */}
        <button
          onClick={handleLoadDemoData}
          disabled={seeding}
          className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          <Database className="w-3.5 h-3.5 text-teal-600" />
          <span>{seeding ? 'Seeding...' : (seedMsg || 'Load Demo Data')}</span>
        </button>

        {/* Notifications Icon */}
        <button 
          onClick={() => navigate('/alerts')}
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          title="Alerts"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-teal-400 font-bold flex items-center justify-center text-xs shadow-sm">
            {user.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-900 leading-tight">
              {user.name || 'Hospital Admin'}
            </span>
            <span className="block text-[10px] font-semibold text-teal-600 uppercase tracking-wide">
              {user.role || 'Admin'}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}

