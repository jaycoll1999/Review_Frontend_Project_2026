'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { 
  Users, 
  Globe, 
  MessageSquare, 
  Award,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to load administrator statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const connectionRate = stats?.totalUsers > 0 
    ? ((stats.totalGmbConnected / stats.totalUsers) * 100).toFixed(0) 
    : '0';

  const planStats = stats?.plans || {};
  const freeCount = planStats['Free'] || 0;
  const starterCount = planStats['Starter'] || 0;
  const proCount = planStats['Pro'] || 0;
  const premiumCount = starterCount + proCount;

  const cards = [
    { 
      name: 'Total Platform Users', 
      value: stats?.totalUsers || 0, 
      desc: 'Registered business accounts', 
      icon: Users, 
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-950/20'
    },
    { 
      name: 'Active GMB Connections', 
      value: stats?.totalGmbConnected || 0, 
      desc: `${connectionRate}% conversion rate`, 
      icon: Globe, 
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-950/20'
    },
    { 
      name: 'Reviews Captured', 
      value: stats?.totalFeedbacks || 0, 
      desc: 'All-time verified feedbacks', 
      icon: MessageSquare, 
      color: 'from-purple-500 to-pink-600',
      shadow: 'shadow-purple-950/20'
    },
    { 
      name: 'Premium Subscribers', 
      value: premiumCount, 
      desc: `${proCount} Pro, ${starterCount} Starter`, 
      icon: Award, 
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-950/20'
    },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER STATEMENT */}
      <div className="admin-welcome-card rounded-3xl p-8 border relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <h3 className="text-2xl font-black admin-text-primary leading-tight">Welcome to the Command Hub</h3>
          <p className="admin-text-secondary font-semibold text-sm max-w-xl">
            Audit system directories, check global Google Business Profile connection stats, and track activities from a unified administrative control room.
          </p>
        </div>
        <div className="flex-none flex gap-3 relative z-10">
          <div className="px-4 py-2.5 bg-[var(--admin-bg-card-hover)] border admin-border rounded-2xl flex items-center gap-2 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[var(--admin-accent-indigo-text)]" />
            <span className="text-xs font-black text-[var(--admin-accent-indigo-text)] uppercase tracking-widest">Admin Role</span>
          </div>
        </div>
      </div>

      {/* STATS TILES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 admin-card border rounded-3xl relative overflow-hidden shadow-xl transition-all duration-300 admin-card-hover group cursor-default"
          >
            {/* Background Glow */}
            <div className="absolute top-[-20%] right-[-20%] w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-black admin-text-muted uppercase tracking-wider leading-none">
                {card.name}
              </span>
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.color} ${card.shadow} flex items-center justify-center text-white`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h2 className="text-3xl font-black admin-text-primary tracking-tight">{card.value}</h2>
              <p className="text-xs font-semibold admin-text-secondary">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SYSTEM AND PLAN DISTRIBUTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PLAN SEGMENTATION CARD */}
        <div className="lg:col-span-2 p-8 admin-card border rounded-3xl shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 border-b admin-border pb-4">
            <div>
              <h3 className="text-lg font-black admin-text-primary">Tier Segmentation</h3>
              <p className="text-xs font-semibold admin-text-muted mt-0.5">Distribution of user accounts across product tiers</p>
            </div>
            <Award className="w-5 h-5 text-[var(--admin-accent-indigo-text)]" />
          </div>

          <div className="space-y-6">
            {/* Plan statistics bars */}
            {[
              { name: 'Pro Subscription', count: proCount, percent: stats?.totalUsers > 0 ? (proCount / stats.totalUsers) * 100 : 0, color: 'from-amber-500 to-orange-500' },
              { name: 'Starter Subscription', count: starterCount, percent: stats?.totalUsers > 0 ? (starterCount / stats.totalUsers) * 100 : 0, color: 'from-indigo-500 to-purple-500' },
              { name: 'Free Account Tier', count: freeCount, percent: stats?.totalUsers > 0 ? (freeCount / stats.totalUsers) * 100 : 0, color: 'from-slate-600 to-slate-400' },
            ].map(item => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold admin-text-secondary">
                  <span>{item.name}</span>
                  <span className="font-black admin-text-primary">{item.count} users ({item.percent.toFixed(0)}%)</span>
                </div>
                <div className="w-full h-3 bg-[var(--admin-bg-input)] rounded-full overflow-hidden border admin-border">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SYSTEM INSIGHTS */}
        <div className="p-8 admin-card border rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 border-b admin-border pb-4">
              <div>
                <h3 className="text-lg font-black admin-text-primary">System Insights</h3>
                <p className="text-xs font-semibold admin-text-muted mt-0.5">Automated platform highlights</p>
              </div>
              <Zap className="w-5 h-5 text-[var(--admin-accent-emerald-text)]" />
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-start p-4 bg-[var(--admin-bg-card-hover)] border admin-border rounded-2xl transition-all hover:scale-[1.01]">
                <CheckCircle2 className="w-4 h-4 text-[var(--admin-accent-emerald-text)] mt-0.5 flex-none" />
                <div>
                  <h4 className="text-xs font-black text-[var(--admin-accent-indigo-text)]">GMB Integration Density</h4>
                  <p className="text-[11px] font-semibold admin-text-secondary mt-0.5">
                    {connectionRate}% of users have linked their Google Business Profile to capture reviews.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-4 bg-[var(--admin-bg-card-hover)] border admin-border rounded-2xl transition-all hover:scale-[1.01]">
                <CheckCircle2 className="w-4 h-4 text-[var(--admin-accent-indigo-text)] mt-0.5 flex-none" />
                <div>
                  <h4 className="text-xs font-black text-[var(--admin-accent-indigo-text)]">Premium Density</h4>
                  <p className="text-[11px] font-semibold admin-text-secondary mt-0.5">
                    Premium subscription tier stands at {stats?.totalUsers > 0 ? (((starterCount + proCount) / stats.totalUsers) * 100).toFixed(0) : '0'}% of all active profiles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t admin-border text-center">
            <span className="text-[10px] font-black uppercase tracking-widest admin-text-muted">ReviewFlow Audit Core v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
