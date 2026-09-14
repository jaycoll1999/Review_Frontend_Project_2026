'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  QrCode, 
  Settings2, 
  FileSearch, 
  Sparkles, 
  Globe, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronDown,
  Repeat,
  Plus,
  ShieldCheck,
  Zap,
  ChevronRight,
  Bot,
  User as UserIcon,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const baseMenuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Magic QR', icon: QrCode, href: '/qr' },
  { name: 'Automation', icon: Settings2, href: '/automation' },
  { name: 'AI Agent', icon: Bot, href: '/ai-agent', badge: 'AI' },
  { name: 'Audit Report', icon: FileSearch, href: '/audit' },
  { name: 'AI Suggested Posts', icon: Sparkles, href: '/posts', badge: 'NEW' },
  { name: 'Website', icon: Globe, href: '/website' },
  { name: 'Plans', icon: CreditCard, href: '/plans' },
  { name: 'Profile', icon: UserIcon, href: '/profile' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Sidebar Auth Error:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-50 flex flex-col z-50 h-screen overflow-hidden select-none">
      
      {/* 1. TOP SECTION (Strict Fixed Height) */}
      <div className="flex-none p-5 pb-2">
        <Link href="/dashboard" className="flex items-center gap-3 group mb-6">
          <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-100 group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-black text-lg relative z-10">R</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-slate-900 leading-none">ReviewFlow</span>
            <div className="flex items-center gap-1.5 mt-1">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Engine</span>
            </div>
          </div>
        </Link>

        {/* BUSINESS SWITCHER: Compact Mode */}
        <div className="relative mb-4">
          <button 
            onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-100 transition-all group"
          >
            <div className="flex flex-col items-start overflow-hidden text-left">
               <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Active Business</span>
               <span className="text-[13px] font-black text-slate-900 truncate w-full pr-1">
                 {user?.businessName || 'ReviewFlow Demo'}
               </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-transform duration-500 ${isSwitcherOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isSwitcherOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsSwitcherOpen(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 5, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-1.5 z-20 overflow-hidden"
                >
                  <div className="p-2.5 bg-indigo-50 rounded-xl mb-1 flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-[9px] font-black">
                      {user?.businessName?.[0] || 'R'}
                    </div>
                    <span className="text-xs font-black text-indigo-700 truncate flex-1">
                      {user?.businessName || 'Current Business'}
                    </span>
                  </div>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-all">
                    <div className="flex items-center gap-2.5">
                      <Repeat className="w-3.5 h-3.5 text-slate-300" />
                      <span className="text-xs font-bold">Switch Business</span>
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-all">
                    <div className="flex items-center gap-2.5">
                      <Plus className="w-3.5 h-3.5 text-slate-300" />
                      <span className="text-xs font-bold">Add Location</span>
                    </div>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. MIDDLE SECTION (Flex-1) */}
      <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto scrollbar-hide">
        {[
          ...baseMenuItems,
          ...(user?.role === 'admin' ? [{ name: 'Admin Hub', icon: Shield, href: '/admin-panel', badge: 'ADMIN' }] : [])
        ].map((item) => {
          const isActive = pathname === item.href || (item.href === '/admin-panel' && pathname.startsWith('/admin-panel'));
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-4 h-4 transition-all duration-500 ${isActive ? 'text-indigo-400' : 'text-slate-300 group-hover:text-slate-900 group-hover:scale-110'}`} />
              <div className="flex-1 flex items-center justify-between">
                <span className={`text-[13px] font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>
                  {item.name}
                </span>
                {item.badge && (
                  <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider ${isActive ? 'bg-indigo-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* 3. BOTTOM SECTION (Strict Fixed Height) */}
      <div className="flex-none p-4 mt-auto border-t border-slate-50">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-2 space-y-1.5">
           <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Safe Engine</span>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-900">Protected</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
           </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-500 group"
        >
          <LogOut className="w-4 h-4 text-slate-200 group-hover:text-red-600 group-hover:scale-110 transition-all" />
          <span className="text-[13px] font-black tracking-tight group-hover:text-red-600 transition-colors">Logout</span>
        </button>
      </div>
    </aside>
  );
}
