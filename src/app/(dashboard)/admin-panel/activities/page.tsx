'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { 
  Activity,
  Calendar,
  User,
  ShieldAlert,
  ArrowRightLeft,
  Key,
  Globe,
  PlusCircle,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data: any = await api.get('/admin/activities');
        setActivities(data);
      } catch (err) {
        console.error('Failed to query system activity logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const getIcon = (action: string) => {
    switch (action) {
      case 'login':
        return { icon: Key, className: 'admin-accent-login' };
      case 'admin_created':
        return { icon: ShieldAlert, className: 'admin-accent-admin_created' };
      case 'gmb_connect':
        return { icon: Globe, className: 'admin-accent-gmb_connect' };
      case 'plan_update':
        return { icon: ArrowRightLeft, className: 'admin-accent-plan_update' };
      case 'feedback_added':
        return { icon: FileText, className: 'admin-accent-feedback_added' };
      default:
        return { icon: PlusCircle, className: 'admin-accent-default' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* EXPLANATORY CARD */}
      <div className="p-6 admin-card border rounded-3xl shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-black admin-text-primary">Security Timeline Log</h3>
          <p className="text-xs font-semibold admin-text-muted">Real-time chronicle of critical system processes and business linkages.</p>
        </div>
        <Activity className="w-5 h-5 text-[var(--admin-accent-indigo-text)]" />
      </div>

      {/* CHRONOLOGICAL TIMELINE VERTICAL FEED */}
      <div className="relative pl-6 md:pl-8 border-l admin-timeline-connector space-y-8 py-4 ml-4">
        {activities.length === 0 ? (
          <div className="p-8 admin-card border rounded-3xl text-center admin-text-muted font-semibold text-sm">
            No system activity logs found.
          </div>
        ) : (
          activities.map((act, i) => {
            const config = getIcon(act.action);
            const ActIcon = config.icon;
            
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="relative"
              >
                {/* Timeline Connector Indicator Node */}
                <div className={`absolute left-[-38px] md:left-[-46px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-xl border flex items-center justify-center ${config.className} z-10 shadow-lg`}>
                  <ActIcon className="w-3.5 h-3.5" />
                </div>

                {/* Log Event Card */}
                <div className="p-6 admin-card border rounded-3xl shadow-xl flex flex-col md:flex-row md:items-start justify-between gap-4 transition-all hover:shadow-2xl">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-[var(--admin-bg-input)] border admin-border rounded-full admin-text-secondary">
                        {act.action?.replace('_', ' ')}
                      </span>
                      
                      <div className="flex items-center gap-1 text-[10px] font-bold admin-text-muted">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {act.createdAt ? new Date(act.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          }) : 'N/A'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-bold admin-text-primary leading-relaxed">
                      {act.details}
                    </p>
                  </div>

                  {/* Associated Account details */}
                  <div className="flex-none p-3.5 bg-[var(--admin-bg-card-hover)] border admin-border rounded-2xl flex items-center gap-3 max-w-xs transition-all duration-300">
                    <div className="w-8 h-8 rounded-xl bg-[var(--admin-bg-input)] flex items-center justify-center admin-text-muted flex-none border admin-border">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-[10px] font-black admin-text-muted uppercase tracking-widest leading-none">System User</span>
                      <span className="text-xs font-black admin-text-primary truncate mt-1">
                        {act.userName || 'System Kernal'}
                      </span>
                      <span className="text-[9px] font-semibold admin-text-muted truncate">
                        {act.userEmail || 'kernal@reviewflow.ai'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
