import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children, pageTitle }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Workspace */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Topbar setMobileOpen={setMobileOpen} pageTitle={pageTitle} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
