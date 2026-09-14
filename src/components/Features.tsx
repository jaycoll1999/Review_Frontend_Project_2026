'use client';
import { Bot, Star, Search, Zap, Globe, Share2, Sparkles, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "AI Review Automation",
    description: "Our intelligent agent drafts personalized, context-aware responses to every review in seconds.",
    icon: Bot,
    color: "bg-indigo-50 text-indigo-600",
    border: "border-indigo-100/50",
    badge: "Most Popular"
  },
  {
    title: "Magic QR Posters",
    description: "Generate professional, print-ready QR materials that make leaving 5-star reviews effortless.",
    icon: Layout,
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-100/50"
  },
  {
    title: "Ranking Accelerator",
    description: "Optimize your GMB profile with AI-driven keyword signals to dominate local search rankings.",
    icon: Search,
    color: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100/50"
  },
  {
    title: "Google Sync Hub",
    description: "Connect multiple locations and manage your entire reputation from a single premium dashboard.",
    icon: Globe,
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100/50"
  },
  {
    title: "Smart Insights",
    description: "Get weekly SEO health audits and reputation reports delivered straight to your inbox.",
    icon: Sparkles,
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100/50"
  },
  {
    title: "One-Click Sharing",
    description: "Instantly broadcast your best reviews to social media to boost social proof and sales.",
    icon: Share2,
    color: "bg-rose-50 text-rose-600",
    border: "border-rose-100/50"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-40 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Powerhouse Features</span>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">Everything you need to <br /><span className="text-indigo-600 italic">win locally.</span></h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Stop wasting hours on manual tasks. Let ReviewFlow AI handle the heavy lifting while you focus on your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group bg-white p-10 rounded-[2.5rem] border ${feature.border} shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-2xl hover:shadow-slate-200/50 relative overflow-hidden`}
            >
              {feature.badge && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                  {feature.badge}
                </div>
              )}
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">{feature.description}</p>
              <div className="flex items-center gap-2 text-sm font-black text-indigo-600 group-hover:gap-4 transition-all duration-300 cursor-pointer">
                 Learn More
                 <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
