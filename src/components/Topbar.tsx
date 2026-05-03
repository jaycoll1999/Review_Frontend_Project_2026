'use client';
import { useState } from 'react';
import { Bell, ChevronDown, Sparkles, Home, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Topbar({ user }: { user: any }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 leading-none">
            {user?.businessName || 'ReviewFlow Business'}
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active System</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full shadow-lg shadow-slate-200 hover:bg-slate-800 hover:-translate-y-0.5 transition-all active:scale-95">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          Upgrade to Pro
        </button>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors group">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-600 rounded-full border-2 border-white" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 pl-6 border-l border-slate-100 hover:opacity-80 transition-all"
            >
              <div className="flex flex-col items-end mr-1">
                <p className="text-sm font-bold text-slate-900 leading-none">{user?.name || 'User'}</p>
                <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mt-1">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-600 border border-white shadow-sm overflow-hidden">
                {user?.name?.[0] || 'U'}
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</p>
                    <p className="text-sm font-bold text-slate-900 mt-1 truncate">{user?.email}</p>
                  </div>
                  
                  <button 
                    onClick={() => { router.push('/dashboard'); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-purple-600 hover:bg-slate-50 transition-all group"
                  >
                    <Home className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    <span className="text-sm font-bold">Dashboard Home</span>
                  </button>

                  <button 
                    onClick={() => { router.push('/settings'); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-purple-600 hover:bg-slate-50 transition-all group"
                  >
                    <User className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    <span className="text-sm font-bold">Account Settings</span>
                  </button>

                  <div className="h-px bg-slate-50 my-1 mx-2" />

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all group"
                  >
                    <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors" />
                    <span className="text-sm font-bold">Logout Session</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
