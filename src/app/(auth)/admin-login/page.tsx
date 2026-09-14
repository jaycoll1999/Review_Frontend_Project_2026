'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { Button } from '@/components/Button';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert,
  ChevronLeft
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Bypasses normal front-end email format validation for command 'login -admin'
      const requestEmail = email.trim();
      const res: any = await api.post('/auth/login', { 
        email: requestEmail, 
        password 
      });

      if (res.role !== 'admin') {
        toast.error('Access Denied: Regular users are not permitted here.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        return;
      }

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
      localStorage.setItem('adminToken', res.token);
      localStorage.setItem('adminUser', JSON.stringify(res));
      toast.success('System Administrator Authenticated.');
      router.push('/admin-panel');
    } catch (err: any) {
      toast.error(err.message || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4 md:p-8 selection:bg-purple-900 selection:text-purple-100">
      <Toaster position="top-center" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-[#111726]/80 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] border border-slate-800 relative overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />

        <div className="relative z-10">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-slate-300 uppercase tracking-widest mb-8 transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            User Portal
          </Link>

          <header className="mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-[0_10px_20px_rgba(79,70,229,0.3)]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Admin Gate</h1>
            <p className="text-slate-400 font-semibold text-sm">Please identify yourself to access review assets.</p>
          </header>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Admin Command / Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input 
                  type="text" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@reviewflow.ai or command"
                  className="w-full pl-12 pr-4 h-14 bg-[#182033] border border-slate-800 rounded-2xl text-sm font-bold text-white placeholder:text-slate-600 focus:bg-[#1a2338] focus:ring-4 focus:ring-purple-950 focus:border-purple-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Security Phrase</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 h-14 bg-[#182033] border border-slate-800 rounded-2xl text-sm font-bold text-white placeholder:text-slate-600 focus:bg-[#1a2338] focus:ring-4 focus:ring-purple-950 focus:border-purple-500 transition-all outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black rounded-2xl shadow-xl shadow-purple-950/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] relative overflow-hidden group"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="ready"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span>Access Platform Core</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </form>

          <footer className="mt-8 flex justify-center items-center gap-2 text-slate-600 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            ReviewFlow AI Security Kernel v1.0
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
