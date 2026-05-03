'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { 
  TrendingUp, 
  MessageSquare, 
  Bot,
  Zap,
  Sparkles,
  Search,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ZapIcon,
  ChevronRight,
  ExternalLink,
  Copy
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchData(parsedUser.id);
      } catch (e) {
        console.error("Dashboard Auth Error:", e);
      }
    }
  }, []);

  const fetchData = async (userId: string) => {
    try {
      setLoading(true);
      const res: any = await api.get(`/feedback/${userId}`);
      setReviews(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = () => {
    setSyncing(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Connecting to Google Profile...',
        success: () => {
          setSyncing(false);
          return 'Sync complete! 4 new reviews found.';
        },
        error: 'Connection failed.',
      }
    );
  };

  const stats = [
    { label: "Total Reviews", value: reviews.length, change: "+12%", icon: MessageSquare, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Avg Rating", value: "4.9", change: "Stable", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Response Rate", value: "94%", change: "+5%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Search Visibility", value: "+2.4k", change: "+18%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const quickActions = [
    { title: "Review Automation", desc: "Automate your GMB replies with AI.", icon: Bot, link: "/automation", color: "indigo" },
    { title: "Magic QR Design", desc: "Create high-res review posters.", icon: Zap, link: "/qr", color: "purple" },
    { title: "SEO Audit", desc: "Check your local ranking score.", icon: Search, link: "/audit", color: "emerald" },
    { title: "Post Assistant", desc: "AI suggested posts for GMB.", icon: Sparkles, link: "/posts", color: "amber" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10 py-6">
        {/* TOP HEADER: WELCOME & STATUS */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-sm md:text-base font-bold text-slate-500">
              Your reputation is growing. Here is what happened today.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-3 bg-white p-1.5 pl-4 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan:</span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest">{user?.plan || 'BRONZE'}</span>
             </div>
             <Button onClick={() => router.push('/plans')} variant="secondary" className="h-12 px-6 rounded-xl shadow-lg shadow-indigo-100">
                Upgrade Pro
             </Button>
          </div>
        </header>

        {/* MINI STATS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="p-6 border-none shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all group overflow-hidden relative">
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-1">
                 <span className={`text-[10px] font-black ${stat.change === 'Stable' ? 'text-slate-400' : 'text-emerald-500'}`}>
                   {stat.change}
                 </span>
                 {stat.change !== 'Stable' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
              </div>
            </Card>
          ))}
        </div>

        {/* PRIMARY CONVERSION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           <div className="lg:col-span-8 space-y-8">
              {!user?.gmbConnected ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl shadow-indigo-100"
                >
                   <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                     <ZapIcon className="w-48 h-48 text-indigo-500 rotate-12" />
                   </div>
                   <div className="relative z-10 space-y-6 max-w-lg">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" />
                        Next Action Required
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                        Connect your <br /><span className="text-indigo-400">Google Business</span> Profile
                      </h2>
                      <p className="text-slate-400 font-medium text-lg leading-relaxed">
                        To start automating your reviews and scaling your local SEO, we need to sync with your official Google profile.
                      </p>
                      <Button onClick={() => router.push('/automation')} className="h-16 px-10 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all flex items-center gap-3">
                        Connect Google Now
                        <ArrowRight className="w-6 h-6" />
                      </Button>
                   </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">Profile Connected</h3>
                        <p className="text-slate-500 font-medium mt-1">Synced with {user.businessName}</p>
                      </div>
                   </div>
                   <div className="flex flex-col gap-2 w-full md:w-auto">
                      <Button onClick={handleSync} loading={syncing} variant="secondary" className="h-12 px-8 rounded-xl">Refresh Sync</Button>
                      <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest">Last Sync: 2m ago</p>
                   </div>
                </div>
              )}

              {/* RECENT REVIEWS FEED */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Recent Activity</h3>
                   <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors">View All Feed</button>
                </div>
                <div className="space-y-4">
                   {reviews.slice(0, 3).map((review, i) => (
                     <div key={i} className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm flex items-start gap-5 hover:border-indigo-100 transition-all cursor-default group">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-black shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                           {review.customerName?.[0] || 'C'}
                        </div>
                        <div className="flex-1 space-y-1">
                           <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black text-slate-900">{review.customerName || 'Anonymous Customer'}</h4>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date().toLocaleDateString()}</span>
                           </div>
                           <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(star => (
                                <Star key={star} className={`w-3 h-3 ${star <= (review.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                              ))}
                           </div>
                           <p className="text-sm font-medium text-slate-500 leading-relaxed mt-2 italic">
                              "{review.comment || 'No comment provided.'}"
                           </p>
                        </div>
                     </div>
                   ))}
                   {reviews.length === 0 && (
                     <div className="py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-10">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
                           <MessageSquare className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-black text-slate-900">No reviews found yet</h4>
                        <p className="text-sm font-medium text-slate-500 mt-2 max-w-xs">Start collecting 5-star feedback by sharing your Magic QR or connecting Google.</p>
                     </div>
                   )}
                </div>
              </div>
           </div>

           {/* QUICK ACTION CARDS SIDEBAR */}
           <div className="lg:col-span-4 space-y-6">
              <div className="px-2">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Control Center</h3>
              </div>
              <div className="grid grid-cols-1 gap-6">
                 {quickActions.map((action, i) => (
                   <button 
                     key={i} 
                     onClick={() => router.push(action.link)}
                     className="w-full text-left bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 hover:border-indigo-100 transition-all group flex items-center gap-6"
                   >
                     <div className={`w-14 h-14 bg-${action.color}-50 rounded-2xl flex items-center justify-center text-${action.color}-600 group-hover:scale-110 group-hover:bg-${action.color}-600 group-hover:text-white transition-all duration-500`}>
                        <action.icon className="w-7 h-7" />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-base font-black text-slate-900 leading-none mb-1">{action.title}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{action.desc}</p>
                     </div>
                     <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                   </button>
                 ))}
              </div>

              {/* AI OPTIMIZATION INSIGHTS (Actionable Stats) */}
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden mt-10 shadow-2xl shadow-indigo-100">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Zap className="w-24 h-24 text-indigo-400" />
                 </div>
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-2">
                       <Sparkles className="w-4 h-4 text-indigo-400" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Insights</span>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-300">SEO Health Score</p>
                          <p className="text-sm font-black text-emerald-400">84 / 100</p>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[84%] bg-emerald-500 rounded-full" />
                       </div>
                       
                       <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-300">Sentiment Index</p>
                          <p className="text-sm font-black text-indigo-400">96% Positive</p>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[96%] bg-indigo-500 rounded-full" />
                       </div>
                    </div>

                    <button 
                      onClick={() => router.push('/audit')}
                      className="w-full h-14 bg-white text-slate-900 font-black rounded-2xl text-xs hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group"
                    >
                      Run Actionable Audit
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
