'use client';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: "James Wilson",
    role: "Owner, Wilson Dental",
    quote: "ReviewFlow AI is the best investment I've made for my practice. We went from 3.8 to 4.9 stars in 4 months without asking a single patient manually.",
    initials: "JW",
    color: "bg-blue-600"
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director, LuxStay",
    quote: "The auto-response agent is scary good. It sounds human, professional, and it saves our team 10+ hours a week. Truly a game changer.",
    initials: "ER",
    color: "bg-purple-600"
  },
  {
    name: "Marcus Chen",
    role: "Founder, Chen Agency",
    quote: "I use this for all 50 of my clients. The ROI is immediate. The QR poster generator alone is worth the subscription price.",
    initials: "MC",
    color: "bg-indigo-600"
  }
];

export default function Testimonials() {
  return (
    <section className="py-40 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">Loved by <span className="text-indigo-600">Growth-Minded</span> Agencies.</h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Join thousands of businesses that have transformed their reputation with our AI automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-10 rounded-[2.5rem] bg-[#f8fafc] border border-slate-100 relative group transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-200 group-hover:text-indigo-100 transition-colors" />
              
              <p className="text-slate-700 font-semibold text-lg leading-relaxed mb-10 relative z-10">
                "{review.quote}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
                <div className={`w-12 h-12 rounded-2xl ${review.color} flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100`}>
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-slate-900 font-black text-sm">{review.name}</h4>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{review.role}</span>
                    <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <div className="inline-flex items-center gap-6 px-10 py-6 bg-slate-900 rounded-3xl text-white shadow-2xl shadow-slate-200">
              <div className="text-left">
                 <p className="text-2xl font-black">4.9/5</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average User Rating</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-left">
                 <p className="text-2xl font-black">2.5k+</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Agencies</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
