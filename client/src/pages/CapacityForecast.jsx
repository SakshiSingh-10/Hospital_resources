import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, AlertTriangle, ShieldCheck, Cpu, RefreshCw, ChevronRight } from 'lucide-react';
import { predictionAPI } from '../services/api';

export default function CapacityForecast() {
  const [period, setPeriod] = useState('7 Days');
  const [department, setDepartment] = useState('Emergency');
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState({
    predictedPatients: 136,
    predictedBeds: 91,
    predictedICU: 18,
    doctorsRequired: 14,
    nursesRequired: 32,
    riskLevel: 'High',
    confidenceScore: 0.84,
    recommendation: 'Forecast indicates 136 expected patients with a projected bed demand of 91. Recommend allocating 14 doctors and 32 nurses.'
  });

  const chartData = [
    { day: 'Day -6', Historical: 112, Forecast: null },
    { day: 'Day -5', Historical: 118, Forecast: null },
    { day: 'Day -4', Historical: 124, Forecast: null },
    { day: 'Day -3', Historical: 120, Forecast: null },
    { day: 'Day -2', Historical: 129, Forecast: null },
    { day: 'Day -1', Historical: 132, Forecast: null },
    { day: 'Today', Historical: 126, Forecast: 126 },
    { day: '+1d', Historical: null, Forecast: 129 },
    { day: '+2d', Historical: null, Forecast: 131 },
    { day: '+3d', Historical: null, Forecast: 134 },
    { day: '+5d', Historical: null, Forecast: 138 },
    { day: '+7d', Historical: null, Forecast: 142 }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await predictionAPI.generateForecast({ forecastPeriod: period, department });
      if (res.prediction) {
        setForecast(res.prediction);
      }
    } catch (err) {
      console.warn('Using cached forecast');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Capacity Forecast">
      <div className="space-y-8">
        
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Capacity Forecast Controls</h2>
            <p className="text-xs text-slate-500">Forecast hospital resource requirements using historical operational data.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            >
              <option value="24 Hours">24 Hours</option>
              <option value="3 Days">3 Days</option>
              <option value="7 Days">7 Days</option>
              <option value="14 Days">14 Days</option>
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            >
              <option value="All">All Departments</option>
              <option value="Emergency">Emergency</option>
              <option value="ICU">ICU</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Surgery">Surgery</option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-teal-600/20 text-xs inline-flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Calculating...' : 'Generate Forecast'}
            </button>
          </div>
        </div>

        {/* FORECAST KPIs (Section 33) */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Expected Intake</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{forecast.predictedPatients}</div>
            <span className="text-[10px] font-semibold text-teal-600">Patients</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Expected Bed Demand</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{forecast.predictedBedDemand}</div>
            <span className="text-[10px] font-semibold text-teal-600">Beds</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Expected ICU Demand</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{forecast.predictedICUDemand}</div>
            <span className="text-[10px] font-semibold text-amber-600">ICU Beds</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Doctors Required</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{forecast.predictedDoctorRequirement}</div>
            <span className="text-[10px] font-semibold text-blue-600">Doctors</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Nurses Required</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{forecast.predictedNurseRequirement}</div>
            <span className="text-[10px] font-semibold text-indigo-600">Nurses</span>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-xs">
            <span className="text-xs font-medium text-amber-800">Potential Bed Gap</span>
            <div className="text-2xl font-black text-amber-900 mt-1">17 Beds</div>
            <span className="text-[10px] font-bold text-amber-700">Action Advised</span>
          </div>
        </div>

        {/* FORECAST CHART (Section 34) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Patient Demand Forecast</h3>
              <p className="text-xs text-slate-500">Comparing past admissions with machine-learning model estimates</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded bg-teal-50 text-teal-700 border border-teal-200">
              Confidence Score: {Math.round(forecast.confidenceScore * 100)}%
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[100, 160]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="Historical" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Historical Patient Intake" />
                <Line type="monotone" dataKey="Forecast" stroke="#0284c7" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} name="Forecast Projection" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 pt-1">
            *Forecast values are model estimates based on historical operational data.
          </div>
        </div>

        {/* CAPACITY WARNING (Section 35) & EXPLAINABILITY FACTORS (Section 56) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Capacity Warning Card */}
          <div className="lg:col-span-6 bg-amber-50 rounded-2xl border border-amber-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Capacity Warning
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
                High Risk
              </span>
            </div>

            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              Expected bed demand of <strong className="font-extrabold">92 beds</strong> exceeds available capacity of <strong className="font-extrabold">75 beds</strong>. Potential bed gap of <strong className="font-extrabold">17 beds</strong> predicted within the next 48 hours.
            </p>

            <div className="pt-2">
              <button className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm inline-flex items-center gap-1.5">
                Review Capacity Planning
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Machine Learning Explainability / Forecast Factors */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Forecast Factors</h3>
              <span className="text-xs text-slate-500 font-medium">Machine-Learning Explainability</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">Recent admissions trend</span>
                <span className="font-bold text-teal-700">High Impact (+12%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">Emergency case volume</span>
                <span className="font-bold text-teal-700">High Impact (+8%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">Current bed occupancy</span>
                <span className="font-bold text-slate-600">Moderate (+5%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">Day-of-week pattern</span>
                <span className="font-bold text-slate-600">Low (+2%)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
