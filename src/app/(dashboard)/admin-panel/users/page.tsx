'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { 
  Search, 
  Globe, 
  ExternalLink,
  Award,
  Calendar,
  CheckCircle2,
  XCircle,
  Mail,
  Briefcase,
  UserCheck,
  Trash2,
  ChevronDown,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const data: any = await api.get('/admin/users');
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error('Failed to query system user directory:', err);
      toast.error('Failed to retrieve user accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(user => 
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.businessName?.toLowerCase().includes(query) ||
      user.gmbEmail?.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // 1. Passwordless User Impersonation ("Login As")
  const handleImpersonate = async (userId: string) => {
    setActionLoadingId(`impersonate-${userId}`);
    try {
      const adminToken = localStorage.getItem('adminToken');
      const adminUser = localStorage.getItem('adminUser');

      if (!adminToken || !adminUser) {
        toast.error('Administrator session not found.');
        return;
      }

      // API Call
      const res: any = await api.post(`/admin/impersonate/${userId}`, {});

      // Store Target User Credentials
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
      localStorage.setItem('isImpersonating', 'true');

      toast.success(`Authenticating session as ${res.businessName}...`);
      window.location.href = '/dashboard';
    } catch (err: any) {
      toast.error(err.message || 'Impersonation failed.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // 2. Terminate Account ("Delete User")
  const handleDeleteUser = async (userId: string, email: string) => {
    if (!window.confirm(`⚠️ WARNING: Are you sure you want to permanently delete user "${email}"?\nThis will purge all GMB statistics, links, and review records and CANNOT be undone.`)) {
      return;
    }

    setActionLoadingId(`delete-${userId}`);
    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success('Account permanently terminated.');
      // Refresh list
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || 'Deletion failed.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // 3. Update Plan level directly
  const handlePlanChange = async (userId: string, plan: string) => {
    setActionLoadingId(`plan-${userId}`);
    try {
      await api.put(`/admin/users/${userId}/plan`, { plan });
      toast.success(`Plan updated to ${plan}.`);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to modify subscription plan.');
    } finally {
      setActionLoadingId(null);
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
    <div className="space-y-6">
      {/* SEARCH AND FILTERS CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 admin-card border rounded-3xl shadow-xl transition-all">
        <div className="relative flex-1 max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, email, business, or GMB account..."
            className="w-full pl-11 pr-4 h-12 admin-input border rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
        <div className="text-right select-none">
          <span className="text-[10px] font-black admin-text-muted uppercase tracking-widest leading-none">Records Found</span>
          <h4 className="text-lg font-black admin-text-primary">{filteredUsers.length} accounts</h4>
        </div>
      </div>

      {/* MASTER USER GRID DIRECTORY */}
      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="p-12 admin-card border rounded-3xl text-center admin-text-muted font-semibold text-sm shadow-xl">
            No matching client records found.
          </div>
        ) : (
          filteredUsers.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="admin-card border rounded-3xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[var(--admin-accent-indigo-text)] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* 1. BUSINESS & ACCOUNT INFO */}
              <div className="flex-1 min-w-[240px] space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base font-black admin-text-primary transition-colors">
                    {user.name}
                  </h4>
                  {user.role === 'admin' && (
                    <span className="text-[7px] font-black uppercase tracking-widest px-2 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15 rounded-full select-none">
                      Admin Role
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold admin-text-secondary">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-none" />
                    <span>{user.businessName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold admin-text-muted">
                    <Mail className="w-3.5 h-3.5 text-slate-400 flex-none" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold admin-text-muted">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 flex-none" />
                    <span>Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* 2. SUBSCRIPTION DETAILS */}
              <div className="w-full lg:w-44 space-y-2 flex-none">
                <span className="text-[9px] font-black admin-text-muted uppercase tracking-widest block select-none">Subscription Details</span>
                {user.role === 'admin' ? (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15 text-[10px] font-black uppercase rounded-full select-none">
                    Admin Staff
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative inline-block text-left overflow-visible">
                      <select
                        value={user.plan || 'Free'}
                        onChange={(e) => handlePlanChange(user.id, e.target.value)}
                        disabled={actionLoadingId === `plan-${user.id}`}
                        className={`appearance-none pl-3.5 pr-8 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all ${
                          user.plan === 'Pro' 
                            ? 'admin-accent-plan_update' 
                            : user.plan === 'Starter' 
                            ? 'admin-accent-login' 
                            : 'admin-accent-default'
                        }`}
                      >
                        <option value="Free" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Free</option>
                        <option value="Starter" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Starter</option>
                        <option value="Pro" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Pro</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div>
                      <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full select-none ${
                        (user.planStatus || 'Active').toLowerCase() === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15' 
                          : (user.planStatus || 'Active').toLowerCase() === 'trialing' 
                          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15' 
                          : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/15'
                      }`}>
                        {user.planStatus || 'Active'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. GOOGLE INTEGRATION STATUS */}
              <div className="w-full lg:w-52 space-y-2 flex-none">
                <span className="text-[9px] font-black admin-text-muted uppercase tracking-widest block select-none">Google GMB Connection</span>
                <div className="space-y-2">
                  <div>
                    {user.gmbConnected ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 admin-accent-gmb_connect border text-[10px] font-black uppercase tracking-wider rounded-full select-none">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Connected</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 admin-accent-default border text-[10px] font-black uppercase tracking-wider rounded-full select-none">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Disconnected</span>
                      </div>
                    )}
                  </div>
                  {user.gmbEmail ? (
                    <div className="text-[10px] font-mono font-bold bg-[var(--admin-bg-input)] px-2.5 py-1.5 rounded-xl border admin-border admin-text-secondary truncate max-w-[190px] block">
                      {user.gmbEmail}
                    </div>
                  ) : (
                    <span className="text-[10px] admin-text-muted font-semibold italic block select-none">No GMB Account</span>
                  )}
                </div>
              </div>

              {/* 4. PLATFORM ENDPOINTS */}
              <div className="w-full lg:w-44 space-y-2 flex-none">
                <span className="text-[9px] font-black admin-text-muted uppercase tracking-widest block select-none">Endpoints</span>
                <div className="flex flex-col gap-1.5 items-start">
                  {user.googleReviewLink ? (
                    <a 
                      href={user.googleReviewLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-black text-[var(--admin-accent-indigo-text)] hover:underline uppercase tracking-widest"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      GMB Page
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-[9px] font-black admin-text-muted uppercase tracking-widest select-none">No GMB Link</span>
                  )}

                  {user.role !== 'admin' && (
                    <a 
                      href={`/r/${user.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-black text-[var(--admin-accent-purple-text)] hover:underline uppercase tracking-widest"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Feedback Form
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* 5. ACTIONS SECTION */}
              <div className="w-full lg:w-auto flex items-center justify-end gap-2 border-t lg:border-t-0 pt-4 lg:pt-0 admin-border flex-none">
                {user.role === 'admin' ? (
                  <span className="text-[9px] font-black admin-text-muted uppercase tracking-widest select-none py-2">Access Restricted</span>
                ) : (
                  <>
                    <button
                      onClick={() => handleImpersonate(user.id)}
                      disabled={actionLoadingId !== null}
                      title="Passwordless user login"
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-950/20 active:scale-[0.96] flex items-center gap-1.5 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {actionLoadingId === `impersonate-${user.id}` ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <UserCheck className="w-3.5 h-3.5" />
                      )}
                      <span>Login As</span>
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user.id, user.email)}
                      disabled={actionLoadingId !== null}
                      title="Terminate user profile"
                      className="w-9 h-9 bg-[rgba(239,68,68,0.1)] border border-red-500/20 text-red-500 hover:bg-[rgba(239,68,68,0.2)] rounded-xl flex items-center justify-center transition-all active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {actionLoadingId === `delete-${user.id}` ? (
                        <div className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
