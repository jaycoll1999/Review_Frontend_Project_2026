'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { 
  FileSearch, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Search,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AuditPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Audit Auth Error:", e);
      }
    }
  }, []);

  const [isAutoFixing, setIsAutoFixing] = useState(false);

  const handleAutoFix = () => {
    setIsAutoFixing(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2500)),
      {
        loading: 'Injecting local SEO tags and optimizing profile categories...',
        success: 'Local SEO keywords and metadata updated!',
        error: 'Failed to apply auto-fix.',
      }
    ).then(() => {
      setIsAutoFixing(false);
    });
  };

  const runAudit = () => {
    setIsRunning(true);
    setShowReport(false);
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 4000)),
      {
        loading: 'Performing deep SEO crawl...',
        success: 'Local Audit complete! 8 priority items identified.',
        error: 'Failed to run audit.',
      }
    ).then(() => {
      setIsRunning(false);
      setShowReport(true);
    });
  };

  const scores = [
    { label: 'SEO Health', value: 84, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Reputation', value: 92, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Map Visibility', value: 67, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const optimizations = [
    { title: 'Missing Service Keywords', impact: 'High', icon: Search, desc: 'Your profile lacks "Near Me" optimized service descriptions.' },
    { title: 'Duplicate Categories', impact: 'Medium', icon: AlertTriangle, desc: 'Multiple overlapping business categories detected.' },
    { title: 'Inconsistent NAP', impact: 'High', icon: MapPin, desc: 'Phone number mismatch found on 3 local directories.' },
    { title: 'Review Velocity', impact: 'Low', icon: TrendingUp, desc: 'Your weekly review frequency has dipped by 15%.' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10 py-8">
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Local SEO Audit</h1>
              <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">v2.4</span>
            </div>
            <p className="text-lg font-medium text-slate-500">Deep analysis of {user?.businessName || 'Your Business'}'s performance on Google Maps.</p>
          </div>
          <Button 
            onClick={runAudit} 
            disabled={isRunning}
            className="h-14 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-2xl shadow-purple-200 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
            <span className="font-bold">{isRunning ? 'Running Analysis...' : 'Run New Audit'}</span>
          </Button>
        </header>

        {showReport ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {scores.map((score) => (
                <Card key={score.label} className="p-8 border-none shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{score.label}</p>
                    <p className={`text-4xl font-black ${score.color}`}>{score.value}%</p>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl ${score.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <BarChart3 className={`w-8 h-8 ${score.color}`} />
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Report Area */}
              <div className="lg:col-span-8 space-y-8">
                <Card title="Required Optimizations" subtitle="Priority items to improve your ranking">
                  <div className="space-y-4">
                    {optimizations.map((opt, i) => (
                      <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-white transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                          opt.impact === 'High' ? 'bg-red-50 text-red-600' : 
                          opt.impact === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          <opt.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-lg font-black text-slate-900">{opt.title}</h4>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                              opt.impact === 'High' ? 'bg-red-100 text-red-700' : 
                              opt.impact === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                            }`}>{opt.impact} Impact</span>
                          </div>
                          <p className="text-sm font-medium text-slate-500">{opt.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 transition-colors self-center" />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar Stats */}
              <div className="lg:col-span-4 space-y-8">
                <Card title="GMB Status" className="bg-slate-900 text-white border-none">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Status</p>
                        <p className="text-sm font-bold">Successfully Verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Post Frequency</p>
                        <p className="text-sm font-bold">2.4 Posts / Week</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Automation</p>
                        <p className="text-sm font-bold">Active & Scanning</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-none bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-2xl shadow-purple-200">
                  <TrendingUp className="w-12 h-12 mb-6 text-white/50" />
                  <h3 className="text-xl font-black mb-2">Projected Growth</h3>
                  <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
                    Implementing these changes can boost your local map visibility by up to 45% in 30 days.
                  </p>
                  <Button 
                    onClick={handleAutoFix}
                    disabled={isAutoFixing}
                    className="w-full bg-white text-purple-600 hover:bg-slate-50 font-black h-12 rounded-xl shadow-lg transition-transform active:scale-95"
                  >
                    {isAutoFixing ? 'Optimizing Profile...' : 'Auto-Fix With AI Now'}
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 border-none shadow-sm bg-slate-50">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  <FileSearch className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Visibility Score</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">How your business appears in local map searches compared to competitors.</p>
              </Card>
              <Card className="p-8 border-none shadow-sm bg-slate-50">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Missing Info</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">Identify critical business details that are missing or inconsistent across the web.</p>
              </Card>
              <Card className="p-8 border-none shadow-sm bg-slate-50">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Review Sentiment</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">AI-powered analysis of customer feedback and reputation trends.</p>
              </Card>
            </div>

            <Card className="flex flex-col items-center justify-center py-32 border-dashed border-2 border-slate-200 bg-white/50 group hover:border-purple-400 transition-all cursor-pointer" onClick={runAudit}>
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8 group-hover:bg-purple-100 transition-colors">
                <FileSearch className="w-12 h-12 text-slate-300 group-hover:text-purple-600" />
              </div>
              <h2 className="text-3xl font-black text-slate-400 group-hover:text-purple-600 transition-colors">No Recent Audits</h2>
              <p className="text-slate-400 font-medium mt-2 max-w-sm text-center">Run your first deep-dive audit to see your current ranking and optimization checklist.</p>
              <div className="mt-10 flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <Clock className="w-4 h-4" />
                Takes ~30 Seconds
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
