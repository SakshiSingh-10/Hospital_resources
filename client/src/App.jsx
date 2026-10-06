import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Beds from './pages/Beds';
import ICU from './pages/ICU';
import Staff from './pages/Staff';
import Departments from './pages/Departments';
import Resources from './pages/Resources';
import CapacityForecast from './pages/CapacityForecast';
import CapacityPlanning from './pages/CapacityPlanning';
import Bottlenecks from './pages/Bottlenecks';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/beds" element={<Beds />} />
      <Route path="/icu" element={<ICU />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/resources" element={<Resources />} />
      
      <Route path="/capacity" element={<CapacityForecast />} />
      <Route path="/predictions" element={<CapacityForecast />} />
      <Route path="/planning" element={<CapacityPlanning />} />
      <Route path="/simulator" element={<CapacityPlanning />} />
      <Route path="/bottlenecks" element={<Bottlenecks />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
