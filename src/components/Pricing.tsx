'use client';
import { Check, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Bronze",
    price: "$49",
    description: "Perfect for local shops starting their digital journey.",
    features: [
      "1 Google Business Profile",
      "Basic AI Review Response",
      "Weekly Ranking Report",
      "Magic QR Code Generator",
      "Email Support"
    ],
    recommended: false,
    color: "bg-slate-100 text-slate-900"
  },
  {
    name: "Silver",
    price: "$99",
    description: "The sweet spot for growing service businesses.",
    features: [
      "3 Google Business Profiles",
      "Advanced AI Agent Persona",
      "Daily Audit & Optimization",
      "Unlimited Review Funnels",
      "Priority Support",
      "White-label Reports"
    ],
    recommended: true,
    color: "bg-indigo-600 text-white"
  },
  {
    name: "Gold",
    price: "$199",
    description: "Scale your agency with unlimited power.",
    features: [
      "10 Google Business Profiles",
      "Custom AI Training",
      "Full White-label Platform",
      "API Access",
      "Dedicated Success Manager",
      "Multi-user Access"
    ],
    recommended: false,
    color: "bg-slate-100 text-slate-900"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-40 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">Simple. <span className="text-indigo-600">Transparent.</span></h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Choose the plan that fits your business stage. No hidden fees. Switch or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-12 rounded-[3rem] border transition-all duration-500 relative group",
                plan.recommended 
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-indigo-200 scale-105 z-20" 
                  : "bg-[#f8fafc] text-slate-900 border-slate-100 shadow-sm"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-4">
                 {plan.recommended ? <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> : <Zap className="w-5 h-5 text-indigo-500" />}
                 <h3 className="text-xl font-black uppercase tracking-widest">{plan.name}</h3>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                <span className={plan.recommended ? "text-slate-400" : "text-slate-500"}>/mo</span>
              </div>
              <p className={cn("text-sm font-medium mb-10 leading-relaxed", plan.recommended ? "text-slate-400" : "text-slate-500")}>
                {plan.description}
              </p>

              <div className="space-y-4 mb-12">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", plan.recommended ? "bg-emerald-500" : "bg-indigo-100")}>
                      <Check className={cn("w-3 h-3", plan.recommended ? "text-white" : "text-indigo-600")} />
                    </div>
                    <span className="text-sm font-bold opacity-90">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={cn(
                "w-full h-16 rounded-2xl font-black transition-all active:scale-95 text-lg shadow-lg",
                plan.recommended 
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 shadow-indigo-500/20" 
                  : "bg-white text-slate-900 hover:bg-slate-50 shadow-slate-200/50"
              )}>
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100/50 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
           <div>
              <h4 className="text-2xl font-black text-slate-900 mb-2">Need a custom enterprise solution?</h4>
              <p className="text-slate-500 font-medium">For agencies with 50+ locations, we offer custom white-label setups.</p>
           </div>
           <button className="px-10 h-14 bg-white text-slate-900 font-black rounded-xl border border-indigo-100 shadow-sm hover:bg-indigo-50 transition-colors">
              Talk to Enterprise
           </button>
        </div>
      </div>
    </section>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
