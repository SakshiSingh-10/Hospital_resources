import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { authAPI } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('admin@careflow.com');
  const [password, setPassword] = useState('admin12345');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authAPI.login(email, password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not reach the CareFlow server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
        
        {/* LEFT SIDE: Brand & Value Prop */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-white shadow-md">
                <Activity className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">Care<span className="text-teal-400">Flow</span></span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Hospital System</span>
              </div>
            </Link>

            <div className="pt-8 space-y-3">
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-widest bg-teal-900/60 px-3 py-1 rounded-full border border-teal-700/50 inline-block">
                Operations Platform
              </span>
              <h2 className="text-2xl font-bold tracking-tight leading-snug">
                Hospital Resource & Capacity Management
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Monitor hospital capacity, manage resources, and plan operations efficiently with real-time operational insights.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2 relative z-10">
            <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <span>Authorized Clinical & Administrative Personnel Only</span>
          </div>

        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sign In</h3>
            <p className="text-xs text-slate-500 mt-1">Enter your credentials to access CareFlow Hospital Admin.</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Preset Selector for Evaluators */}
          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-slate-700 flex items-center justify-between">
            <span className="font-semibold text-teal-900">Demo Login:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setEmail('admin@careflow.com'); setPassword('admin12345'); }}
                className="px-2.5 py-1 rounded bg-teal-600 text-white font-bold text-[11px] hover:bg-teal-700 transition-colors"
              >
                Admin User
              </button>
              <button
                type="button"
                onClick={() => { setEmail('staff@careflow.com'); setPassword('staff123'); }}
                className="px-2.5 py-1 rounded bg-slate-800 text-white font-bold text-[11px] hover:bg-slate-900 transition-colors"
              >
                Staff User
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-sm font-semibold text-slate-900"
                  placeholder="admin@careflow.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-sm font-semibold text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span>Remember me</span>
              </label>
              <span className="text-teal-600 hover:underline cursor-pointer font-semibold">Forgot password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-teal-600/20 transition-all text-sm flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to CareFlow'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-teal-600 font-bold hover:underline">
              Create Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}


