'use client';
import { useEffect, useState } from 'react';
import { 
  Shield, 
  User, 
  Mail, 
  Key, 
  Terminal, 
  Database, 
  Check, 
  Edit3, 
  Server, 
  Info, 
  Download, 
  CheckCircle2, 
  Lock, 
  RefreshCw 
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminProfilePage() {
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('rf_live_adm_9281a8b3c84d7e9f0102');

  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsed = JSON.parse(storedUser);
        setAdmin(parsed);
        setName(parsed.name || 'System Admin');
        setEmail(parsed.email || 'admin@reviewflow.ai');
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, []);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      toast.error('Name and email cannot be empty.');
      return;
    }
    
    // Simulate updating the admin local storage and state
    const updatedAdmin = { ...admin, name, email };
    setAdmin(updatedAdmin);
    localStorage.setItem('adminUser', JSON.stringify(updatedAdmin));
    setIsEditing(false);
    toast.success('Administrator profile updated successfully!');
    
    // Force a custom event or page reload to sync the sidebar immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
      // Wait a tiny bit and refresh so the sidebar state updates
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleRegenerateKey = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Regenerating secure session key...',
        success: () => {
          const newKey = 'rf_live_adm_' + Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 6);
          setApiKey(newKey);
          return 'New API access token generated!';
        },
        error: 'Key generation failed.',
      }
    );
  };

  const handleExportReport = () => {
    try {
      const data = {
        platform: "ReviewFlow AI Admin Panel",
        version: "1.0.0",
        exportTime: new Date().toISOString(),
        administrator: {
          name: admin?.name,
          email: admin?.email,
          role: admin?.role,
        },
        securityConfig: {
          tokenType: "Bearer JWT",
          keyFingerprint: apiKey.substring(0, 15) + "...",
          privileges: [
            "read:users",
            "write:users",
            "read:gmb",
            "write:gmb",
            "read:feedback",
            "write:feedback",
            "admin:audit"
          ]
        },
        systemStatus: {
          nodeEnv: "development",
          database: "Neon Serverless Postgres",
          sslMode: "require",
          coreApiHost: "localhost:5001"
        }
      };

      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
      )}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", jsonString);
      downloadAnchor.setAttribute("download", `reviewflow_admin_report_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success('System configuration report downloaded!');
    } catch (err) {
      toast.error('Failed to export system report.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const privileges = [
    { title: "Read User Directories", desc: "View and filter all customer accounts, businesses, and details." },
    { title: "GMB Operations Controller", desc: "Access location feeds, force metadata rebuilds, and view raw tokens." },
    { title: "Platform Feedback Manager", desc: "Read, edit, or delete platform feedbacks and customer review records." },
    { title: "Activity Logging Daemon", desc: "Full audit logs tracing authorization, signup, and tier connection activities." },
    { title: "Global Security Bypass", desc: "Authorize kernel-level actions and update plan/subscription levels directly." }
  ];

  return (
    <div className="space-y-10">
      {/* HEADER STATEMENT */}
      <div className="admin-welcome-card rounded-3xl p-8 border relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <h3 className="text-2xl font-black admin-text-primary leading-tight">Admin Profile Settings</h3>
          <p className="admin-text-secondary font-semibold text-sm max-w-xl">
            Configure your administrator profile identity, manage OAuth access credentials, and audit secure database node parameters.
          </p>
        </div>
        <div className="flex-none flex gap-3 relative z-10">
          <button 
            onClick={handleExportReport} 
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all text-xs font-black uppercase tracking-wider"
          >
            <Download className="w-4 h-4" />
            Export System Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Card: Edit Credentials */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 admin-card border rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b admin-border pb-4">
                <div>
                  <h3 className="text-lg font-black admin-text-primary">Admin Identity</h3>
                  <p className="text-xs font-semibold admin-text-muted mt-0.5">Secure profile metadata credentials</p>
                </div>
                <User className="w-5 h-5 text-[var(--admin-accent-indigo-text)]" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[var(--admin-bg-card-hover)] border admin-border rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md text-sm">
                    {admin?.name?.[0] || 'A'}
                  </div>
                  <div>
                    <h4 className="text-sm font-black admin-text-primary">{admin?.name || 'System Admin'}</h4>
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mt-0.5">{admin?.role || 'administrator'}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black admin-text-muted uppercase tracking-widest">Administrator Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                        <User className="w-4 h-4" />
                      </span>
                      <input 
                        type="text"
                        value={name}
                        disabled={!isEditing}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[var(--admin-bg-input)] border admin-border rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 disabled:opacity-60 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black admin-text-muted uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input 
                        type="email"
                        value={email}
                        disabled={!isEditing}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[var(--admin-bg-input)] border admin-border rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 disabled:opacity-60 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t admin-border flex gap-3 mt-6">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave} 
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Details
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setName(admin?.name || 'System Admin');
                      setEmail(admin?.email || 'admin@reviewflow.ai');
                    }} 
                    className="px-5 py-3 bg-slate-650 hover:bg-slate-700 text-slate-300 border admin-border rounded-xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="w-full py-3 bg-[var(--admin-bg-card-hover)] border admin-border hover:border-indigo-500 text-[var(--admin-accent-indigo-text)] rounded-xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Credentials
                </button>
              )}
            </div>
          </div>

          {/* Secure Keys Card */}
          <div className="p-8 admin-card border rounded-3xl shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b admin-border pb-4">
              <div>
                <h3 className="text-lg font-black admin-text-primary">Secret Access Token</h3>
                <p className="text-xs font-semibold admin-text-muted mt-0.5">Secure API authorization token</p>
              </div>
              <Key className="w-5 h-5 text-[var(--admin-accent-amber-text)]" />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[var(--admin-bg-input)] border admin-border rounded-2xl flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-slate-400 select-all truncate">
                  {apiKey}
                </span>
                <span className="flex-none px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded text-[8px] font-black uppercase tracking-wider">
                  Live Key
                </span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleRegenerateKey}
                  className="w-full py-3 bg-[var(--admin-bg-card-hover)] border admin-border hover:border-amber-500 text-amber-500 rounded-xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Token
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Privileges & Env Status */}
        <div className="lg:col-span-7 space-y-8">
          {/* Admin Privileges */}
          <div className="p-8 admin-card border rounded-3xl shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b admin-border pb-4">
              <div>
                <h3 className="text-lg font-black admin-text-primary">System Privileges</h3>
                <p className="text-xs font-semibold admin-text-muted mt-0.5">Assigned super-user permission rules</p>
              </div>
              <Lock className="w-5 h-5 text-[var(--admin-accent-emerald-text)]" />
            </div>

            <div className="space-y-4">
              {privileges.map((p, i) => (
                <div key={i} className="flex gap-3.5 items-start p-4 bg-[var(--admin-bg-card-hover)] border admin-border rounded-2xl transition-all hover:scale-[1.01]">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[var(--admin-accent-emerald-text)] mt-0.5 flex-none" />
                  <div>
                    <h4 className="text-xs font-black admin-text-primary">{p.title}</h4>
                    <p className="text-[11px] font-semibold admin-text-secondary mt-0.5">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Node Env / System Status */}
          <div className="p-8 admin-card border rounded-3xl shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b admin-border pb-4">
              <div>
                <h3 className="text-lg font-black admin-text-primary">Environment Settings</h3>
                <p className="text-xs font-semibold admin-text-muted mt-0.5">Admin-level framework parameters</p>
              </div>
              <Server className="w-5 h-5 text-[var(--admin-accent-indigo-text)]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Platform Core Node", value: "v1.0.0-stable", icon: Info },
                { label: "Database Connection", value: "Active", icon: Database, color: "text-emerald-500" },
                { label: "Node Environment", value: "development", icon: Terminal },
                { label: "API Gateway Host", value: "http://localhost:5001/api", icon: Server }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--admin-bg-input)] border admin-border rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--admin-bg-card-hover)] border admin-border flex items-center justify-center text-slate-400">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black admin-text-muted uppercase tracking-wider leading-none mb-1">{item.label}</p>
                    <p className={`text-xs font-black admin-text-primary ${item.color || ''}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
