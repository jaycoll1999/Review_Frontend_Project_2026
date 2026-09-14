'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Mail, Send, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for subscribing to Reputation Growth Weekly!', { icon: '📬' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-6 border-t border-slate-100 bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
        {/* Company Bio */}
        <div className="col-span-1 md:col-span-1 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <span className="font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              ReviewFlow<span className="text-indigo-600">AI</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs font-medium">
            The #1 Google Reputation Management & Local SEO Automation platform for local businesses, clinics, and multi-location agencies.
          </p>
          <p className="text-xs text-slate-400 font-semibold">
            Autonomous Trilingual AI • English, Hindi & Marathi.
          </p>
        </div>

        {/* Product Navigation Links */}
        <div>
          <h3 className="font-black text-slate-900 mb-5 uppercase text-xs tracking-widest">Platform</h3>
          <ul className="space-y-3 text-sm font-semibold text-slate-500">
            <li><a href="#features" className="hover:text-indigo-600 transition-colors">AI Review Automation</a></li>
            <li><a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-indigo-600 transition-colors">SaaS Pricing Plans</a></li>
            <li><a href="#faq" className="hover:text-indigo-600 transition-colors">SEO & GMB FAQ</a></li>
            <li><Link href="/plans" className="hover:text-indigo-600 transition-colors">Upgrade & Scale</Link></li>
          </ul>
        </div>

        {/* Legal & Trust */}
        <div>
          <h3 className="font-black text-slate-900 mb-5 uppercase text-xs tracking-widest">Solutions</h3>
          <ul className="space-y-3 text-sm font-semibold text-slate-500">
            <li><a href="#why" className="hover:text-indigo-600 transition-colors">Local Ranking Signals</a></li>
            <li><a href="#contact" className="hover:text-indigo-600 transition-colors">Agency White-Label</a></li>
            <li><Link href="/login" className="hover:text-indigo-600 transition-colors">Client Portal</Link></li>
            <li><Link href="/register" className="hover:text-indigo-600 transition-colors">Free Trial Sign Up</Link></li>
            <li><a href="#main-content" className="hover:text-indigo-600 transition-colors">Google Compliance</a></li>
          </ul>
        </div>

        {/* Newsletter & Subscriptions */}
        <div>
          <h3 className="font-black text-slate-900 mb-5 uppercase text-xs tracking-widest">Reputation Newsletter</h3>
          <p className="text-sm text-slate-500 mb-4 font-medium leading-relaxed">
            Get weekly Google Maps rank tracking tips and local business growth strategies.
          </p>
          {subscribed ? (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-700 text-xs font-bold">
              <Check className="w-4 h-4" />
              <span>Subscribed! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
              <input 
                id="newsletter-email"
                type="email" 
                name="email"
                placeholder="Enter work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
              />
              <button 
                type="submit" 
                aria-label="Subscribe to newsletter"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md shadow-indigo-100 flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>Join</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>
      </div>
      
      {/* Bottom Legal & Back to Top */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} ReviewFlow AI, Inc. Built for Google Business Profile optimization. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-xs text-slate-400 font-medium">Privacy Policy</span>
          <span className="text-xs text-slate-400 font-medium">Terms of Service</span>
          <button 
            type="button" 
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
