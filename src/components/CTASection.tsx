'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-32 px-6 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-100/50"
        >
          {/* Animated Background Decor */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/4 w-[80%] h-[150%] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-1/2 -left-1/4 w-[80%] h-[150%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for the next level?</span>
            </div>

            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.05]">
              Get your business to <br /><span className="text-indigo-400 italic">number one.</span>
            </h2>

            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Join 2,500+ agencies and businesses who trust ReviewFlow AI to automate their reputation and scale their local search presence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link href="/login" className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3 active:scale-95 group">
                Create Free Account
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-12 py-6 bg-white/5 backdrop-blur-md text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-95">
                Contact Sales
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
               {[
                 "No Credit Card",
                 "Cancel Anytime",
                 "2 Minute Setup"
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                   {text}
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
