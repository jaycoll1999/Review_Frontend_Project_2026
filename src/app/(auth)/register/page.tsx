'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { Button } from '@/components/Button';
import { 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordStrength = useMemo(() => {
    const pw = formData.password;
    if (!pw) return 0;
    let strength = 0;
    if (pw.length >= 8) strength += 1;
    if (/[A-Z]/.test(pw)) strength += 1;
    if (/[0-9]/.test(pw)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pw)) strength += 1;
    return strength;
  }, [formData.password]);

  const strengthColor = [
    'bg-slate-200',
    'bg-red-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-indigo-500'
  ][passwordStrength];

  const strengthText = [
    'Too weak',
    'Weak',
    'Fair',
    'Strong',
    'Excellent'
  ][passwordStrength];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordStrength < 2) {
      toast.error('Please use a stronger password');
      return;
    }
    setLoading(true);
    try {
      const res: any = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
      toast.success('Welcome to ReviewFlow AI!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const bullets = [
    { icon: Sparkles, text: "AI-Powered GMB Responses" },
    { icon: Zap, text: "Auto-Generate QR Posters" },
    { icon: ShieldCheck, text: "Reputation Guard & Audit" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-8 selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 relative"
      >
        {/* LEFT PANEL: VALUE PROP */}
        <div className="hidden md:flex bg-slate-900 p-16 relative overflow-hidden flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] right-[-20%] w-[100%] h-[100%] bg-indigo-500/10 rounded-full blur-[150px]"
          />

          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-black text-xl shadow-lg">R</div>
              <span className="text-white font-black text-xl tracking-tight">ReviewFlow AI</span>
            </Link>
            
            <h2 className="text-5xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
              Start Growing <br />
              with <span className="text-indigo-400">AI Power.</span>
            </h2>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed max-w-sm mb-12">
              Join the elite businesses using automation to dominate local search rankings.
            </p>

            <div className="space-y-4">
              {bullets.map((b, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  key={i} 
                  className="flex items-center gap-3 text-white/80 font-bold text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <b.icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  {b.text}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
             <div className="flex -space-x-3 mb-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">+2k</div>
             </div>
             <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Trusted by 2,000+ top agencies</p>
          </div>
        </div>

        {/* RIGHT PANEL: SIGNUP FORM */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Create Account</h1>
              <p className="text-slate-500 font-medium">Join us and setup your agency in minutes.</p>
            </header>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alex J."
                      className="w-full pl-10 pr-4 h-12 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Business Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Agency Name"
                      className="w-full pl-10 pr-4 h-12 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                  <input 
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full pl-10 pr-4 h-12 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                   <span className={`text-[9px] font-bold uppercase tracking-widest ${passwordStrength >= 3 ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {strengthText}
                   </span>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                  <input 
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 h-12 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength Meter */}
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-full flex-1 transition-all duration-500 ${passwordStrength >= i ? strengthColor : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all active:scale-[0.98] group mt-4"
              >
                {loading ? 'Creating Your Account...' : 'Create Account'}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> }
              </Button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                 <div className="flex items-center gap-1.5">
                   <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                   No Credit Card
                 </div>
                 <div className="w-1 h-1 bg-slate-300 rounded-full" />
                 <div className="flex items-center gap-1.5">
                   <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                   Less than 30s
                 </div>
              </div>

              <footer className="pt-8 border-t border-slate-50 w-full text-center">
                <p className="text-slate-500 text-sm font-medium">
                  Already have an account? <Link href="/login" className="text-indigo-600 font-black hover:text-indigo-700 inline-flex items-center gap-1 group">
                    Sign In
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
