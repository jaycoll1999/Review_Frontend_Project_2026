'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { 
  User, 
  Mail, 
  Building, 
  ShieldCheck, 
  CreditCard, 
  Globe, 
  Calendar, 
  ExternalLink,
  Edit,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored && stored !== 'undefined') {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const planTier = user?.plan || 'Free';
  const roleName = user?.role === 'admin' ? 'System Administrator' : 'Business Owner';

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10 py-6">
        {/* HEADER HERO BANNER */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white overflow-hidden shadow-2xl shadow-indigo-100/50">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-xl shadow-indigo-500/30 shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[1.3rem] flex items-center justify-center text-3xl font-black text-white">
                {user?.name?.[0] || 'U'}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{user?.name || 'ReviewFlow User'}</h1>
                <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {roleName}
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">{user?.email || 'user@reviewflow.ai'}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 text-xs text-slate-300 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{user?.businessName || 'ReviewFlow Partner'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                  <span>Plan: {planTier}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 shrink-0">
              <Button 
                onClick={() => router.push('/settings')}
                className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6 h-12 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: BUSINESS & REPUTATION DETAILS */}
          <div className="lg:col-span-2 space-y-8">
            <Card title="Business Profile" subtitle="Your public reputation and brand configuration.">
              <div className="space-y-6 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                      Business Entity
                    </span>
                    <p className="text-base font-black text-slate-900">{user?.businessName || 'Not Set'}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                      Platform Role
                    </span>
                    <p className="text-base font-black text-slate-900 capitalize">{user?.role || 'User'}</p>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                    Google Review Destination
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-mono text-slate-600 truncate flex-1">
                      {user?.googleReviewLink || 'https://g.page/r/example/review'}
                    </p>
                    {user?.googleReviewLink && (
                      <a 
                        href={user.googleReviewLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 shrink-0"
                      >
                        <span>Open Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      user?.gmbConnected ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Google Business Profile</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {user?.gmbConnected ? `Synced with ${user?.gmbEmail || 'Google'}` : 'Not connected yet'}
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => router.push('/automation')}
                    variant="outline"
                    className="h-10 text-xs px-4"
                  >
                    {user?.gmbConnected ? 'Manage Sync' : 'Connect GMB'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: SUBSCRIPTION & SECURITY */}
          <div className="space-y-8">
            <Card title="Subscription Tier">
              <div className="space-y-6 pt-2">
                <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-3xl shadow-lg shadow-indigo-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Current Plan</span>
                    <span className="px-2.5 py-0.5 bg-white/20 text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black">{planTier}</h3>
                    <p className="text-xs text-indigo-100 mt-1 font-medium">Automatic review replies & Magic QR funnel included.</p>
                  </div>
                  <Button 
                    onClick={() => router.push('/plans')}
                    className="w-full bg-white text-slate-900 hover:bg-indigo-50 font-black text-xs h-11 rounded-xl shadow-md"
                  >
                    Change Plan
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Quick Shortcuts</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => router.push('/qr')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl text-xs font-bold text-slate-700 transition-colors group"
                    >
                      <span>Download QR Poster</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </button>
                    <button 
                      onClick={() => router.push('/ai-agent')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl text-xs font-bold text-slate-700 transition-colors group"
                    >
                      <span>Configure AI Persona</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </button>
                    <button 
                      onClick={() => router.push('/audit')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl text-xs font-bold text-slate-700 transition-colors group"
                    >
                      <span>Local SEO Audit</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
