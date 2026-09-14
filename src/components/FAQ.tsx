'use client';
import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const faqs = [
  {
    question: "How does ReviewFlow AI get my business more 5-star Google reviews?",
    answer: "ReviewFlow AI combines smart Review Gating funnels with printable Magic QR posters. When customers scan your QR code at checkout, on tables, or on receipts, happy customers (4-5 stars) are directed straight to your official Google Maps review form. If a customer is unsatisfied (1-3 stars), their feedback is routed to a confidential internal portal so you can resolve the issue immediately before it hurts your public Google rating."
  },
  {
    question: "What languages does the Voice & Text AI Assistant support?",
    answer: "ReviewFlow AI natively understands and speaks English, Hindi (हिंदी), and Marathi (मराठी). Our AI automatically detects the customer's preferred language in real time and crafts authentic, respectful responses tailored to your local audience."
  },
  {
    question: "Is ReviewFlow AI compliant with Google's Business Profile guidelines?",
    answer: "Yes, 100%. ReviewFlow AI adheres strictly to Google Business Profile guidelines and FTC compliance standards. We empower customers to share their feedback while giving business owners an internal mechanism to listen, act, and resolve issues proactively."
  },
  {
    question: "How fast can I set up and print my Magic QR posters?",
    answer: "You can be up and running in less than 2 minutes. Enter your business name or Google review link, and our automated engine generates high-resolution, print-ready QR materials for countertop stands, window stickers, flyers, and receipts."
  },
  {
    question: "Can agencies manage multiple business locations or client profiles?",
    answer: "Yes. Our multi-location architecture is built specifically for local SEO agencies, franchises, and multi-branch businesses. You can manage multiple Google Business Profiles, run automated SEO audits, and switch between locations seamlessly."
  },
  {
    question: "How does automated AI review response improve local SEO ranking?",
    answer: "Google's local search algorithm heavily rewards active business profiles that respond promptly to customer reviews with relevant local keywords. ReviewFlow AI auto-drafts replies infused with your target neighborhood keywords, boosting your Google 3-Pack map visibility."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 px-6 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100/60">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Everything You Need to Know About <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ReviewFlow AI & Local SEO
            </span>
          </h2>
          <p className="text-base md:text-lg font-medium text-slate-500 max-w-2xl mx-auto">
            Got questions about review automation, Google Maps ranking, or regional language support? Find your answers here.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200 hover:border-indigo-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                  id={`faq-question-${index}`}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-base text-slate-600 font-medium leading-relaxed border-t border-slate-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Have more questions about scaling your business?</h4>
            <p className="text-xs text-slate-500">Ask our 24/7 Trilingual AI Assistant using the voice or chat widget below.</p>
          </div>
          <span className="px-4 py-2 bg-white text-indigo-600 font-black text-xs rounded-xl shadow-sm border border-indigo-100">
            Instant 24/7 Support
          </span>
        </div>
      </div>
    </section>
  );
}
