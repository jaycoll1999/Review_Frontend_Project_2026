'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    googleReviewLink: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setFormData({
          name: parsed.name || '',
          businessName: parsed.businessName || '',
          googleReviewLink: parsed.googleReviewLink || ''
        });
      } catch (e) {
        console.error("Settings Auth Error:", e);
      }
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await api.put('/user/update', formData);
      const updatedUser = { ...user, ...res };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated!');
    } catch (err: any) {
      toast.error(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10 py-4">
        <header>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-lg font-medium text-slate-500 mt-2">Manage your account and business configuration.</p>
        </header>

        <form onSubmit={handleUpdate} className="space-y-10">
          <Card title="Business Profile" subtitle="Update your primary business details.">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Business Name</label>
                  <Input 
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Google Review Link</label>
                <Input 
                  placeholder="https://g.page/r/your-id/review" 
                  value={formData.googleReviewLink}
                  onChange={(e) => setFormData({ ...formData, googleReviewLink: e.target.value })}
                  className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                />
                <p className="text-[10px] font-medium text-slate-400 px-1 mt-1 italic">
                  This link is used to redirect customers after they leave a high-rating feedback.
                </p>
              </div>
            </div>
          </Card>

          <Card title="Security" subtitle="Manage your password and authentication.">
            <div className="space-y-8">
              <div>
                <Button variant="outline" type="button" className="h-12 px-8 text-sm bg-white">
                  Reset Password
                </Button>
              </div>
              
              <div className="pt-8 border-t border-slate-50 flex items-center justify-between group">
                <div>
                  <p className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Two-Factor Authentication</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Add an extra layer of security to your account.</p>
                </div>
                <div className="w-12 h-6 bg-slate-100 rounded-full relative cursor-pointer border border-slate-200">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <Button variant="ghost" type="button" className="text-slate-400 hover:text-slate-600">
              Discard Changes
            </Button>
            <Button type="submit" loading={loading} variant="secondary" className="px-12 h-14 shadow-lg shadow-slate-200">
              Save Configuration
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
