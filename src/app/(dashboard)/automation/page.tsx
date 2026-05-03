'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { 
  CheckCircle2, 
  Rocket, 
  RefreshCcw, 
  MessageSquare, 
  Sparkles 
} from 'lucide-react';

import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AutomationPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Automation Auth Error:", e);
      }
    }
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Connecting to Google Business...');
    
    try {
      // Simulate OAuth Popup Delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await api.put('/user/gmb-connect', { 
        email: user?.email 
      });
      
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Successfully connected to Google!', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Failed to connect to Google.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    "Higher Google Ranking with AI-Powered",
    "AI Powered Google Profile Optimization",
    "AI Insights for Building Online Reputation",
    "Auto-Reply to Google reviews using AI",
    "AI Automation For Stay Active & Rank Better",
    "Boost visibility on Google with AI"
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12 py-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Google Profile Automation</h1>
          <p className="text-lg font-medium text-slate-500">Automate your Google Business Profile with following tools</p>
        </header>

        <Card className="p-0 overflow-hidden border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem]">
          <div className="p-12 space-y-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              {/* Google Logo */}
              <div className="md:col-span-2 flex justify-center md:justify-start">
                <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 24 24" className="w-12 h-12">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
              </div>

              {/* Main Tools */}
              <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <RefreshCcw className="w-4 h-4 text-purple-600" />
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Fetch All Reviews</h3>
                  </div>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Sync and manage all your Google reviews</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Automate Review Reply</h3>
                  </div>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Set up automatic response triggers</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">AI Reply</h3>
                  </div>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Generate smart responses using AI</p>
                </div>
              </div>
            </div>

            {/* Checklist & Button */}
            <div className="pt-8 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors duration-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center gap-6">
                {user?.gmbConnected && (
                  <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-emerald-700">Connected to {user.gmbEmail}</span>
                  </div>
                )}
                
                <Button 
                  onClick={handleConnect}
                  disabled={isLoading || user?.gmbConnected}
                  className={`h-14 px-10 rounded-2xl flex items-center gap-3 shadow-2xl transition-all duration-300 group ${
                    user?.gmbConnected 
                      ? 'bg-emerald-600 text-white cursor-default' 
                      : 'bg-black hover:bg-slate-900 text-white shadow-slate-200'
                  }`}
                >
                  {user?.gmbConnected ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-bold">Verified</span>
                    </>
                  ) : (
                    <>
                      <Rocket className={`w-5 h-5 ${isLoading ? 'animate-bounce' : 'group-hover:animate-bounce'}`} />
                      <span className="font-bold">{isLoading ? 'Connecting...' : 'Connect'}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
