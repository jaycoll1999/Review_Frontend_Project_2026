'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isImpersonating, setIsImpersonating] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsImpersonating(localStorage.getItem('isImpersonating') === 'true');
    }
  }, []);

  const handleStopImpersonating = () => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (adminToken && adminUser) {
      // Restore Admin Session
      localStorage.setItem('token', adminToken);
      localStorage.setItem('user', adminUser);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('isImpersonating');
      window.location.href = '/admin-panel/users';
    } else {
      // Fallback
      localStorage.removeItem('isImpersonating');
      window.location.href = '/login-admin';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Toaster position="top-right" />
      
      {/* GLOWING ADMIN IMPERSONATING BANNER */}
      {isImpersonating && (
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-bold text-xs py-3 px-10 flex justify-between items-center z-50 sticky top-0 shadow-lg shadow-amber-950/10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            <span>🛡️ Impersonation Mode: Active Session for Business "{user?.businessName || 'N/A'}" ({user?.email})</span>
          </div>
          <button 
            onClick={handleStopImpersonating}
            className="bg-white hover:bg-slate-100 text-orange-700 hover:scale-[1.02] active:scale-[0.98] transition-all px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm"
          >
            Exit & Return to Admin Panel
          </button>
        </div>
      )}

      <div className="flex flex-1 flex-row">
        <Sidebar />
        <div className="flex-1 ml-72 flex flex-col min-h-screen">
          <Topbar user={user} />
          <main className="flex-1 p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
