import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Lock, Mail, User, Building2, ArrowRight } from 'lucide-react';
import { authAPI } from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.register({ name, email, password, role });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not reach the CareFlow server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Care<span className="text-teal-600">Flow</span></span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-xs text-slate-500">Register as hospital administrator or medical staff.</p>
        </div>

        {error && <p role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-teal-600"
                placeholder="Dr. Sarah Jenkins"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Hospital Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-teal-600"
                placeholder="s.jenkins@careflow.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-teal-600 bg-white"
            >
              <option value="Admin">Hospital Admin (Full Access)</option>
              <option value="Staff">Clinical Staff (View & Manage)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-teal-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-teal-600/20 text-sm flex items-center justify-center gap-2"
          >
            {loading ? 'Creating...' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-teal-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}


