'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { 
  ShieldAlert, 
  Users, 
  Activity, 
  LogOut, 
  LayoutDashboard,
  ExternalLink,
  Sun,
  Moon,
  ChevronDown,
  User
} from 'lucide-react';

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Authenticate Administrator
    const token = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');

    if (!token || !storedUser || storedUser === 'undefined') {
      router.push('/login-admin');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'admin') {
        router.push('/login-admin');
        return;
      }
      setAdmin(parsedUser);
    } catch (e) {
      console.error(e);
      router.push('/login-admin');
    } finally {
      setLoading(false);
    }

    // 2. Load custom Day & Night Theme
    const storedTheme = localStorage.getItem('adminTheme');
    if (storedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, [router]);

  const toggleTheme = () => {
    const nextState = !isDarkMode;
    setIsDarkMode(nextState);
    localStorage.setItem('adminTheme', nextState ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/login-admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin-panel' },
    { name: 'Users & GMB', icon: Users, href: '/admin-panel/users' },
    { name: 'Activity logs', icon: Activity, href: '/admin-panel/activities' },
    { name: 'Admin Profile', icon: User, href: '/admin-panel/profile' },
  ];

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${isDarkMode ? 'theme-dark bg-[#070b13] text-slate-100' : 'theme-light bg-[#f8fafc] text-slate-800'}`}>
      <Toaster position="top-right" />
      
      {/* ADMIN SIDEBAR */}
      <aside className={`fixed left-0 top-0 bottom-0 w-72 border-r flex flex-col z-50 h-screen overflow-hidden select-none transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[#0c1220] border-slate-800' 
          : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* LOGO */}
        <div className="flex-none p-6">
          <Link href="/admin-panel" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-black tracking-tight leading-none transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>ReviewFlow</span>
              <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-1">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* ACTIVE ADMIN CARD */}
        <div className="px-5 mb-6">
          <div className={`p-4 border rounded-2xl flex flex-col text-left transition-all duration-300 ${
            isDarkMode 
              ? 'bg-[#141b2c] border-slate-800/60' 
              : 'bg-slate-50 border-slate-200'
          }`}>
             <span className="text-[7px] font-black text-indigo-400 uppercase tracking-[0.2em] leading-none mb-1">Active Administrator</span>
             <span className={`text-[13px] font-black truncate pr-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-850'}`}>
               {admin?.name || 'System Admin'}
             </span>
             <span className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">
               {admin?.email || 'admin@reviewflow.ai'}
             </span>
          </div>
        </div>

        {/* NAVIGATION MENUS */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border ${
                  isActive 
                    ? isDarkMode
                      ? 'bg-[#1e1b4b] text-white border-[#312e81] shadow-lg shadow-indigo-950/40' 
                      : 'bg-indigo-50 text-indigo-600 border-indigo-100/70 shadow-sm'
                    : isDarkMode
                      ? 'text-slate-400 hover:bg-[#111827] hover:text-white border-transparent'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 border-transparent font-semibold'
                }`}
              >
                <item.icon className={`w-4.5 h-4.5 transition-all duration-300 ${
                  isActive 
                    ? isDarkMode ? 'text-indigo-400' : 'text-indigo-500' 
                    : isDarkMode ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-indigo-500'
                }`} />
                <span className={`text-sm tracking-tight transition-colors duration-300 ${
                  isActive 
                    ? 'font-black' 
                    : isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-600 group-hover:text-indigo-600'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM SECTION */}
        <div className={`flex-none p-4 mt-auto border-t transition-colors duration-300 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <Link 
            href="/dashboard"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1.5 ${
              isDarkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-[#111827]'
                : 'text-slate-650 hover:text-indigo-600 hover:bg-slate-50 font-semibold'
            }`}
          >
            <ExternalLink className={`w-4.5 h-4.5 transition-colors duration-300 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <span className="text-sm tracking-tight">Main Platform</span>
          </Link>

          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isDarkMode
                ? 'text-slate-500 hover:text-red-400 hover:bg-red-950/20'
                : 'text-slate-500 hover:text-red-600 hover:bg-red-50 font-semibold'
            }`}
          >
            <LogOut className="w-4.5 h-4.5 text-slate-500 group-hover:text-red-500 transition-all" />
            <span className="text-sm tracking-tight group-hover:text-red-500 transition-colors">Logout</span>
          </button>
        </div>
      </aside>

      {/* ADMIN CONTENT WRAPPER */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        {/* TOPBAR */}
        <header className={`h-20 border-b flex items-center justify-between px-10 sticky top-0 z-40 transition-all duration-300 ${
          isDarkMode 
            ? 'border-slate-800/80 bg-[#080d15]/80 backdrop-blur-md text-white' 
            : 'border-slate-200 bg-white/80 backdrop-blur-md text-slate-800 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 select-none">
            <h2 className={`text-lg font-black uppercase tracking-wider transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {pathname === '/admin-panel' ? 'Overview Stats' : pathname === '/admin-panel/users' ? 'User Directory' : pathname === '/admin-panel/profile' ? 'Admin Profile' : 'System Activity Timeline'}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            {/* 1. Day and Night theme toggle button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all active:scale-[0.95] flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-[#141b2c] border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-[#172033]' 
                  : 'bg-white border-slate-200 text-indigo-600 hover:text-indigo-700 hover:bg-slate-50 shadow-sm'
              }`}
              title={isDarkMode ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* 2. Kernal Protected Badge */}
            <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-full select-none transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
              <span className="text-[10px] font-black uppercase tracking-wider">Kernal Protected</span>
            </div>

            {/* 3. Professional Admin Profile Dropdown on FAR RIGHT Corner */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-3 pl-4 border-l hover:opacity-85 transition-all focus:outline-none ${
                  isDarkMode ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col items-end mr-1 text-right select-none">
                  <p className={`text-xs font-black leading-none transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{admin?.name || 'Admin'}</p>
                  <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest mt-1">Super User</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/10 border border-indigo-400/20 overflow-hidden text-xs">
                  {admin?.name?.[0] || 'A'}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div className={`absolute right-0 mt-4 w-72 rounded-3xl p-4 z-50 border shadow-2xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-[#0c1220] border-slate-800 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)]' 
                      : 'bg-white border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
                  }`}>
                    {/* Security Session Title */}
                    <div className="text-left">
                      <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none">Security Session</span>
                      <p className={`text-xs font-black truncate mt-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-850'}`}>{admin?.email}</p>
                    </div>

                    {/* Logout Button */}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-red-950/10 border border-red-500/10 hover:bg-red-500/10 text-red-500 rounded-2xl transition-all group mt-4 font-black text-[10px] uppercase tracking-widest"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Logout Session</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* MAIN ADMIN AREA */}
        <main className={`flex-1 p-10 transition-colors duration-300 ${isDarkMode ? 'bg-[#070b13]' : 'bg-[#f8fafc]'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
