import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Activity, LayoutDashboard, Users, Bed, Stethoscope, Building2, 
  Layers, TrendingUp, Sliders, BarChart3, Bell, FileText, Settings, 
  User, LogOut, ChevronRight
} from 'lucide-react';
import { authAPI } from '../../services/api';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  const navGroups = [
    {
      title: "Main Operations",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Patients", path: "/patients", icon: Users },
        { label: "Beds", path: "/beds", icon: Bed },
        { label: "ICU Management", path: "/icu", icon: Activity },
        { label: "Staff Roster", path: "/staff", icon: Stethoscope },
        { label: "Departments", path: "/departments", icon: Building2 },
        { label: "Resources", path: "/resources", icon: Layers }
      ]
    },
    {
      title: "Planning & AI",
      items: [
        { label: "Capacity Forecast", path: "/capacity", icon: TrendingUp },
        { label: "Capacity Planning", path: "/planning", icon: Sliders },
        { label: "Analytics", path: "/analytics", icon: BarChart3 },
        { label: "Alerts", path: "/alerts", icon: Bell },
        { label: "Reports", path: "/reports", icon: FileText }
      ]
    },
    {
      title: "System",
      items: [
        { label: "Settings", path: "/settings", icon: Settings },
        { label: "Profile", path: "/profile", icon: User }
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 text-slate-300 z-50 flex flex-col transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-600/20">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">Care<span className="text-teal-400">Flow</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Hospital Admin</span>
            </div>
          </NavLink>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 text-xs font-medium">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {group.title}
              </div>
              {group.items.map((item, iIdx) => {
                const IconComp = item.icon;
                return (
                  <NavLink
                    key={iIdx}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-teal-600 text-white font-semibold shadow-md shadow-teal-600/20'
                          : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Logout action at bottom */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800/80 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>
    </>
  );
}
