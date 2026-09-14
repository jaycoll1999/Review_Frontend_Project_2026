'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-black text-lg relative z-10">R</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-slate-900">ReviewFlow</span>
            <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black rounded-md uppercase tracking-wider shadow-sm">
              AI
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            FAQ
          </Link>
          <Link href="#contact" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* DESKTOP ACTION BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <Link 
              href="/dashboard" 
              className="px-6 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 transition-all shadow-md shadow-slate-200 flex items-center gap-2 active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-sm font-bold text-slate-700 hover:text-indigo-600 px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-black rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-bold text-slate-700 hover:text-indigo-600 py-1"
          >
            Home
          </Link>
          <Link 
            href="#features" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-bold text-slate-700 hover:text-indigo-600 py-1"
          >
            Features
          </Link>
          <Link 
            href="#pricing" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-bold text-slate-700 hover:text-indigo-600 py-1"
          >
            Pricing
          </Link>
          <Link 
            href="#faq" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-bold text-slate-700 hover:text-indigo-600 py-1"
          >
            FAQ
          </Link>
          <Link 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-bold text-slate-700 hover:text-indigo-600 py-1"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {isLoggedIn ? (
              <Link 
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-slate-900 text-white text-center font-bold text-sm rounded-xl"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 text-center font-bold text-sm text-slate-700 border border-slate-200 rounded-xl"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center font-bold text-sm rounded-xl shadow-lg shadow-indigo-100"
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
