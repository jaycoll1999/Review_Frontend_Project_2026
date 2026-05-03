'use client';
import { useState, useEffect } from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';
import api from '@/lib/api';

export default function Topbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.get('/user/me');
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8 ml-64">
      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-sm">Dashboard</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium text-sm">Overview</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900 leading-none">
              {user?.businessName || 'Business Name'}
            </p>
            <p className="text-xs text-slate-500 mt-1">{user?.email || 'email@example.com'}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
            {user?.name?.charAt(0) || <User className="w-5 h-5" />}
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
