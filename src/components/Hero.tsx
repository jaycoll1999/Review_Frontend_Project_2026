'use client';
import { ArrowRight, Sparkles, CheckCircle2, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="pt-40 pb-24 px-6 overflow-hidden relative bg-[#f8fafc]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-full text-[10px] font-black tracking-widest uppercase mb-8 border border-indigo-50 shadow-sm shadow-indigo-100/50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-POWERED REPUTATION ENGINE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tighter"
          >
            Automate Your <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent italic">Google Reviews</span> <br />
            with AI.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
          >
            The #1 platform for modern businesses to manage reputation, generate QR posters, and boost local rankings automatically.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/login" className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center gap-2 group active:scale-95">
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-5 bg-white text-slate-700 font-black rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all shadow-lg shadow-slate-100 flex items-center justify-center gap-2 active:scale-95">
              View Live Demo
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-bold"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
              ))}
            </div>
            <p className="uppercase tracking-widest">Trusted by <span className="text-slate-900">2,500+</span> agencies</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative lg:ml-auto"
        >
          {/* Main Product Mockup */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] p-4 border border-slate-100 relative z-10 transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 group overflow-hidden">
             {/* Browser Top Bar */}
             <div className="h-8 flex items-center px-4 gap-2 border-b border-slate-50 mb-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </div>
                <div className="flex-1 bg-slate-50 h-4 rounded-md" />
             </div>
             <img 
               src="/reviewflow_hero_illustration.png" 
               alt="ReviewFlow AI Dashboard" 
               className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-700"
             />
          </div>
          
          {/* Floating High-Value Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 z-20 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reputation Score</p>
              <p className="text-xl font-black text-slate-900">98 / 100</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -right-10 z-20 bg-slate-900 p-6 rounded-3xl shadow-2xl border border-white/10 flex flex-col gap-3 max-w-[200px]"
          >
            <div className="flex items-center gap-2">
               <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
               <p className="text-white font-black text-sm tracking-tight">5.0 Star Rating</p>
            </div>
            <p className="text-slate-400 text-[10px] font-bold leading-relaxed">Auto-replied by AI Agent in 2 seconds.</p>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
