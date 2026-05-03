'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Sparkles } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-40 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row relative"
        >
          {/* Branding Side */}
          <div className="lg:w-[40%] p-12 lg:p-20 bg-slate-900 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900" />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" 
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-indigo-300 text-[9px] font-black uppercase tracking-widest mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get in touch</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-8 tracking-tighter">
                Let's scale <br /><span className="text-indigo-400">your agency.</span>
              </h2>
              <p className="text-indigo-100/70 font-medium text-lg leading-relaxed mb-12">
                Have questions about our enterprise plans or white-label solutions? Our team is here to help you grow.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Mail, label: "Email Support", value: "hello@reviewflow.ai" },
                  { icon: Phone, label: "Sales Inquiry", value: "+1 (888) GROW-AI" },
                  { icon: Globe, label: "Global HQ", value: "Silicon Valley, CA" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
                      <item.icon className="w-5 h-5 text-indigo-300 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-white font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-16 flex items-center gap-2 opacity-40">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Support Online</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-[60%] p-12 lg:p-24 bg-white">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none font-bold text-slate-900 placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell us about your business goals..."
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-300 resize-none"
                />
              </div>

              <button className="w-full h-16 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-3 active:scale-[0.98] group">
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Typical response time: <span className="text-slate-900">2 Hours</span>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
