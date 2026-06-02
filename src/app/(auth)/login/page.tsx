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
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
      toast.success('Welcome back to ReviewFlow!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-8 selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 relative"
      >
        {/* LEFT PANEL: BRANDING & DEPTH */}
        <div className="hidden md:flex bg-slate-900 p-8 md:p-12 lg:p-14 relative overflow-hidden flex-col justify-between">
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-indigo-500/20 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              y: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-500/20 rounded-full blur-[100px]"
          />

          {/* Header Content */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-black text-xl shadow-lg">R</div>
              <span className="text-white font-black text-xl tracking-tight group-hover:text-indigo-300 transition-colors">ReviewFlow AI</span>
            </Link>
            
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tighter"
            >
              Dominate <br />
              <span className="text-indigo-400">Local Search</span> <br />
              with AI.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
              className="text-indigo-100 text-lg font-medium leading-relaxed max-w-sm"
            >
              The all-in-one reputation engine that automates your Google presence and scales your business.
            </motion.p>
          </div>

          {/* Testimonial Card (Glassmorphism) */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative z-10 p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl group cursor-default"
          >
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Sparkles key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-white text-lg font-semibold italic leading-snug">
              "ReviewFlow transformed our Google profile. Our review count exploded by 300% in 90 days!"
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-200 font-bold">RF</div>
              <div>
                <p className="text-white font-bold text-sm">ReviewFlow AI</p>
                <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest">Growth at ReviewFlow AI</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT PANEL: PREMIUM LOGIN FORM */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-white">
          <div className="max-w-sm mx-auto w-full">
            <header className="mb-6">
              <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome back</h1>
              <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
            </header>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 h-14 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <Link href="#" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 h-14 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all active:scale-[0.98] relative overflow-hidden group"
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
                        <span>Sign In to Platform</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </form>

            {/* Trust Element */}
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Trusted by 1000+ businesses</span>
              </div>
              <div className="flex items-center gap-6 opacity-20 grayscale">
                 <div className="h-4 w-16 bg-slate-400 rounded-full" />
                 <div className="h-4 w-20 bg-slate-400 rounded-full" />
                 <div className="h-4 w-12 bg-slate-400 rounded-full" />
              </div>
            </div>

            <footer className="mt-6 text-center space-y-4">
              <p className="text-slate-500 text-sm font-medium">
                Don't have an account? <Link href="/register" className="text-indigo-600 font-black hover:text-indigo-700 inline-flex items-center gap-1 group">
                  Create Account
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
              <div className="pt-4 border-t border-slate-100 flex justify-center">
                <Link href="/login-admin" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest inline-flex items-center gap-1 group transition-colors">
                  Are you an Administrator? Sign In Here
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>

      {/* Decorative Orbs for background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-indigo-100/30 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-purple-100/30 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
