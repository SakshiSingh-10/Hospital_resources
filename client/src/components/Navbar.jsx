import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ChevronRight, ShieldCheck, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const user = JSON.parse(localStorage.getItem('careflow_user') || 'null');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-soft py-3 border-b border-slate-200/80' 
        : 'bg-white py-4 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:bg-teal-700 transition-colors">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Care<span className="text-teal-600">Flow</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
                Hospital System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('forecasting')} className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors">
              Forecasting
            </button>
            <button onClick={() => scrollToSection('why-careflow')} className="text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors">
              About
            </button>
              <button onClick={() => scrollToSection('contact')} className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg md:text-sm md:px-0 md:py-0 md:hover:bg-transparent">Contact</button>
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link 
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm transition-all hover:shadow-md"
              >
                <User className="w-4 h-4 text-teal-400" />
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-teal-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 bg-teal-600 text-white hover:bg-teal-700 text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02]"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-6 border-t border-slate-100 mt-3 space-y-3">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('forecasting')} 
                className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Forecasting
              </button>
              <button 
                onClick={() => scrollToSection('why-careflow')} 
                className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg md:text-sm md:px-0 md:py-0 md:hover:bg-transparent">Contact</button>
            </div>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <Link
                  to="/dashboard"
                  className="w-full text-center bg-slate-900 text-white font-semibold py-2.5 rounded-full"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center text-slate-700 font-medium py-2 rounded-lg border border-slate-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center bg-teal-600 text-white font-semibold py-2.5 rounded-full"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


