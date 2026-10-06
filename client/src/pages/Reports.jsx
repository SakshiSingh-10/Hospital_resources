import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { FileText, Download, Printer, Eye } from 'lucide-react';

export default function Reports() {
  const reports = [
    { id: 'rep-1', title: 'Daily Capacity Report', category: 'Operational', date: 'Oct 06, 2026', summary: 'Total Bed Occupancy: 58%. ICU Occupancy: 70%. Emergency Intake: 28 cases.' },
    { id: 'rep-2', title: 'Weekly Resource Report', category: 'Resource Management', date: 'Oct 06, 2026', summary: 'Active Doctors: 34. Active Nurses: 78. Shift coverage efficiency: 92%.' },
    { id: 'rep-3', title: 'Monthly Analytics Report', category: 'Executive Summary', date: 'Oct 01, 2026', summary: 'Monthly patient intake up 8.4%. Average length of stay: 2.4 days.' },
    { id: 'rep-4', title: 'Forecast Demand Report', category: 'AI Planning', date: 'Oct 06, 2026', summary: 'Projected demand estimates 136 admissions over next 7 days. Gap: 17 beds.' },
    { id: 'rep-5', title: 'Resource Utilization Report', category: 'Audit & Compliance', date: 'Oct 06, 2026', summary: 'Departmental bed & ICU utilization rate breakdown across Emergency, ICU, and Surgery.' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = (title) => {
    const csvContent = "data:text/csv;charset=utf-8,Report Title,Date,Category\n" + `${title},2026-10-06,Operational`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <DashboardLayout pageTitle="Capacity Reports">
      <div className="space-y-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">Hospital Resource & Capacity Reports</h2>
          <p className="text-xs text-slate-500">Generate, print, and export operational reports for leadership review.</p>
        </div>

        <div className="space-y-4">
          {reports.map((rep) => (
            <div key={rep.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{rep.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{rep.category}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{rep.summary}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">Generated on: {rep.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={handlePrint}
                  className="flex-1 md:flex-none px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 inline-flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>

                <button
                  onClick={() => handleExportCSV(rep.title)}
                  className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
