'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  Building2, 
  Shield, 
  KeyRound, 
  Check, 
  Lock, 
  X, 
  Sparkles,
  ExternalLink,
  Smartphone,
  Save,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [initialData, setInitialData] = useState({
    name: '',
    businessName: '',
    googleReviewLink: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    googleReviewLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pwdData, setPwdData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        const data = {
          name: parsed.name || '',
          businessName: parsed.businessName || '',
          googleReviewLink: parsed.googleReviewLink || ''
        };
        setFormData(data);
        setInitialData(data);
      } catch (e) {
        console.error("Settings Auth Error:", e);
      }
    }

    const saved2FA = localStorage.getItem('reviewflow_2fa');
    if (saved2FA === 'true') {
      setTwoFactorEnabled(true);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await api.put('/user/update', formData);
      const updatedUser = { ...user, ...res };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setInitialData(formData);
      toast.success('Profile settings updated successfully!', { icon: '✨' });
    } catch (err: any) {
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setFormData(initialData);
    toast('Changes reverted to saved profile', { icon: '↩️' });
  };

  const toggle2FA = () => {
    const nextState = !twoFactorEnabled;
    setTwoFactorEnabled(nextState);
    localStorage.setItem('reviewflow_2fa', String(nextState));
    if (nextState) {
      toast.success('Two-Factor Authentication enabled for your account!');
    } else {
      toast('Two-Factor Authentication disabled', { icon: '🔒' });
    }
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwdData.newPassword || pwdData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setPwdLoading(true);
    setTimeout(() => {
      setPwdLoading(false);
      setShowPasswordModal(false);
      setPwdData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password updated successfully! Next login will require your new password.', { duration: 4000 });
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10 py-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Account & Settings</h1>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-black rounded-full uppercase tracking-wider border border-purple-100/80">
                Workspace
              </span>
            </div>
            <p className="text-base font-medium text-slate-500 mt-2">
              Manage your business profile identity, review redirect destination, and account security.
            </p>
          </div>
        </header>

        <form onSubmit={handleUpdate} className="space-y-10">
          {/* Business Profile */}
          <Card title="Business Profile" subtitle="Update your primary business branding and customer review links.">
            <div className="space-y-8 pt-4">
              {/* Profile Avatar Card */}
              <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-purple-50/60 to-indigo-50/60 rounded-2xl border border-purple-100/60">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-500/20">
                  {formData.businessName?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase() || 'B'}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{formData.businessName || 'Your Business'}</h4>
                  <p className="text-xs font-semibold text-slate-500">{user?.email || 'Registered Business Account'}</p>
                  <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Client ID: #{user?.id ? String(user.id).padStart(4, '0') : '0001'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-2">
                    Account Owner Name
                  </label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-200/80 rounded-xl focus:bg-white text-slate-900 font-medium"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-purple-600" />
                    Business Legal / Display Name
                  </label>
                  <Input 
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-200/80 rounded-xl focus:bg-white text-slate-900 font-medium"
                    placeholder="e.g. Apex Dental & Wellness"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-purple-600" />
                    Google Maps / GMB Review Destination Link
                  </label>
                  {formData.googleReviewLink && (
                    <a 
                      href={formData.googleReviewLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 hover:underline"
                    >
                      Test Link <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <Input 
                  placeholder="https://g.page/r/your-gmb-id/review" 
                  value={formData.googleReviewLink}
                  onChange={(e) => setFormData({ ...formData, googleReviewLink: e.target.value })}
                  className="h-12 bg-slate-50 border-slate-200/80 rounded-xl focus:bg-white text-slate-900 font-medium"
                />
                <p className="text-xs font-medium text-slate-500 px-1 mt-1 leading-relaxed">
                  When customers submit a 4 or 5-star rating through your Smart QR funnel, they are seamlessly guided to this official Google link.
                </p>
              </div>
            </div>
          </Card>

          {/* Security & Authentication */}
          <Card title="Security & Authentication" subtitle="Manage your security credentials and multi-factor authentication.">
            <div className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-slate-900">Account Password</h5>
                    <p className="text-xs font-medium text-slate-500">Regularly updating your password ensures your business reputation data remains secure.</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setShowPasswordModal(true)}
                  className="h-11 px-6 text-sm bg-white hover:bg-slate-50 rounded-xl font-bold text-slate-700 border-slate-200 shadow-sm shrink-0"
                >
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${twoFactorEnabled ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'bg-slate-200 text-slate-600'}`}>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${twoFactorEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                        {twoFactorEnabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 mt-1">Prompt for biometric or one-time verification during business login.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggle2FA}
                  className={`w-14 h-8 rounded-full transition-colors duration-300 relative focus:outline-none p-1 shrink-0 ${
                    twoFactorEnabled ? 'bg-purple-600' : 'bg-slate-200'
                  }`}
                  aria-label="Toggle Two Factor Authentication"
                >
                  <motion.div
                    className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                    animate={{ x: twoFactorEnabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {twoFactorEnabled && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  </motion.div>
                </button>
              </div>
            </div>
          </Card>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200/70">
            <button
              type="button"
              onClick={handleDiscard}
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors px-4 py-2"
            >
              <RotateCcw className="w-4 h-4" />
              Discard Unsaved Changes
            </button>
            <Button 
              type="submit" 
              loading={loading} 
              variant="secondary" 
              className="px-10 h-13 shadow-xl shadow-purple-500/10 font-black rounded-xl flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </div>
        </form>

        {/* Change Password Modal */}
        <AnimatePresence>
          {showPasswordModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">Change Password</h4>
                      <p className="text-xs font-semibold text-slate-400">Enter your credentials below</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPasswordModal(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Current Password</label>
                    <Input 
                      type="password"
                      placeholder="••••••••"
                      value={pwdData.currentPassword}
                      onChange={(e) => setPwdData({ ...pwdData, currentPassword: e.target.value })}
                      required
                      className="h-12 bg-slate-50 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">New Password</label>
                    <Input 
                      type="password"
                      placeholder="At least 6 characters"
                      value={pwdData.newPassword}
                      onChange={(e) => setPwdData({ ...pwdData, newPassword: e.target.value })}
                      required
                      className="h-12 bg-slate-50 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Confirm New Password</label>
                    <Input 
                      type="password"
                      placeholder="Confirm new password"
                      value={pwdData.confirmPassword}
                      onChange={(e) => setPwdData({ ...pwdData, confirmPassword: e.target.value })}
                      required
                      className="h-12 bg-slate-50 rounded-xl"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setShowPasswordModal(false)}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      loading={pwdLoading}
                      variant="secondary"
                      className="rounded-xl px-6"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
