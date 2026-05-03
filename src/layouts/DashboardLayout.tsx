'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Toaster position="top-right" />
      <Sidebar />
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <Topbar user={user} />
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
