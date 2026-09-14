'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/Button';
import { Check, Zap, Rocket, Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const plans = [
  {
    name: "Bronze",
    price: "$49",
    icon: Zap,
    features: ["1 Google Business Profile", "Basic AI Response", "Weekly Reports", "Magic QR Code"],
    color: "bg-blue-50 text-blue-600"
  },
  {
    name: "Silver",
    price: "$99",
    icon: Rocket,
    features: ["3 Google Business Profiles", "Advanced AI Agent", "Daily Optimization", "Review Funnels"],
    color: "bg-purple-600 text-white",
    recommended: true
  },
  {
    name: "Gold",
    price: "$199",
    icon: Crown,
    features: ["10 Google Business Profiles", "Custom AI Training", "API Access", "Dedicated Manager"],
    color: "bg-indigo-50 text-indigo-600"
  }
];

export default function PlansPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      const plan = params.get('plan') || 'Premium';
      toast.success(`${plan} plan activated successfully!`, { icon: '🎉', duration: 4000 });
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        try {
          const user = JSON.parse(storedUser);
          user.plan = plan;
          user.planStatus = 'Active';
          localStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
          console.error("Plans Auth Error:", e);
        }
      }
      window.history.replaceState(null, '', window.location.pathname);
    }
    if (params.get('canceled')) {
      toast.error('Payment was canceled.');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handlePurchase = async (planName: string) => {
    try {
      setLoadingPlan(planName);
      const res: any = await api.post('/stripe/create-checkout-session', { plan: planName });
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment processing failed. Please try again.');
      setLoadingPlan(null);
    }
  };

  const handleContactSales = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Connecting to Sales...',
        success: 'Our enterprise team will contact you at your registered email!',
        error: 'Connection failed.',
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-16 py-8">
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-xl font-medium text-slate-500 leading-relaxed">
            Choose the plan that's right for your business. All plans include our core AI engine and Magic Link system.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative flex flex-col rounded-[2.5rem] transition-all duration-500 border-2 overflow-hidden group ${
                plan.recommended 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] scale-105 z-10' 
                  : 'bg-white border-slate-100 text-slate-900 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-2'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-purple-600 to-indigo-600 py-2 text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Most Popular Choice</span>
                </div>
              )}

              <div className={`p-10 text-center ${plan.recommended ? 'pt-16' : ''}`}>
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 transition-transform duration-500 group-hover:rotate-6 ${
                  plan.recommended 
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-2xl shadow-purple-900' 
                    : 'bg-slate-50 text-slate-900 border border-slate-100 shadow-inner'
                }`}>
                  <plan.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black tracking-tight">{plan.name}</h3>
                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                  <span className={`text-base font-bold ${plan.recommended ? 'text-slate-400' : 'text-slate-400'}`}>/month</span>
                </div>
              </div>

              <div className="px-10 pb-10 space-y-6 flex-1">
                <div className={`h-px w-full ${plan.recommended ? 'bg-white/10' : 'bg-slate-100'}`} />
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        plan.recommended ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className={`text-sm font-bold leading-tight ${plan.recommended ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 pt-0">
                <Button 
                  onClick={() => handlePurchase(plan.name)}
                  loading={loadingPlan === plan.name}
                  variant={plan.recommended ? 'primary' : 'outline'} 
                  className={`w-full h-16 text-lg font-black rounded-3xl shadow-xl transition-all duration-300 ${
                    plan.recommended 
                      ? 'shadow-purple-900/40 hover:scale-[1.02] active:scale-95' 
                      : 'hover:bg-slate-900 hover:text-white border-2 border-slate-100'
                  }`}
                >
                  {plan.recommended ? 'Get Started Now' : 'Choose Plan'}
                </Button>
                <p className={`text-center mt-4 text-[10px] font-bold uppercase tracking-widest ${plan.recommended ? 'text-slate-500' : 'text-slate-400'}`}>
                  No credit card required
                </p>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center bg-slate-50 rounded-[3rem] p-12 border border-slate-100 border-dashed">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Enterprise Needs?</p>
          <h4 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Need a custom plan for 50+ locations?</h4>
          <Button 
            onClick={handleContactSales}
            variant="outline" 
            className="px-12 h-14 bg-white hover:bg-slate-900 hover:text-white transition-all"
          >
            Contact Sales Support
          </Button>
        </footer>
      </div>
    </DashboardLayout>
  );
}
