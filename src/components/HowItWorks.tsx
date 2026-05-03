'use client';
import { motion } from 'framer-motion';
import { Smartphone, Link as LinkIcon, BarChart3, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Connect Profile",
    description: "Sync your Google Business Profile in one click with our secure OAuth connection.",
    icon: LinkIcon,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    number: "02",
    title: "Share QR Link",
    description: "Place your AI-generated QR posters in your shop or share your magic review link.",
    icon: Smartphone,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    number: "03",
    title: "Watch it Grow",
    description: "Our AI handles responses and boosts your rankings while reviews roll in automatically.",
    icon: BarChart3,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-40 px-6 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">Simple. Fast. <span className="text-indigo-600">Automatic.</span></h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Setting up ReviewFlow takes less than 2 minutes. Here is how your journey to the top of Google starts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[25%] left-[10%] right-[10%] h-px bg-dashed bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative text-center group"
            >
              <div className="mb-10 relative inline-block">
                <div className={`${step.bg} w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-slate-100`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-black">
                  {step.number}
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="w-3 h-3" />
                <span>Takes 30 Seconds</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
