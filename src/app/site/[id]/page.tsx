'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/Button';
import { Star, ArrowRight, ExternalLink, Globe, Sparkles } from 'lucide-react';

export default function LiveSitePage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await api.get(`/user/site/${params.id}`);
        setData(res?.data || res);
      } catch (err) {
        console.error('Failed to load site data', err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Building your experience...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md text-center p-12">
          <Globe className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h1 className="text-2xl font-black text-slate-900 mb-2">Site Not Found</h1>
          <p className="text-slate-500 font-medium">The website you are looking for doesn't exist or has been moved.</p>
          <Button onClick={() => window.location.href = '/'} className="mt-8 bg-black text-white px-10 h-14 rounded-2xl font-bold">Return Home</Button>
        </Card>
      </div>
    );
  }

  const s = data.websiteSettings || {};
  const theme = s.theme || 'purple';
  const themeClasses = {
    purple: 'bg-purple-600 shadow-purple-100 text-purple-600 fill-purple-600 bg-purple-50',
    blue: 'bg-blue-600 shadow-blue-100 text-blue-600 fill-blue-600 bg-blue-50',
    emerald: 'bg-emerald-600 shadow-emerald-100 text-emerald-600 fill-emerald-600 bg-emerald-50',
    slate: 'bg-slate-900 shadow-slate-100 text-slate-900 fill-slate-900 bg-slate-50',
  };

  const currentTheme = themeClasses[theme as keyof typeof themeClasses] || themeClasses.purple;
  const btnColor = currentTheme.split(' ')[0];
  const shadowColor = currentTheme.split(' ')[1];
  const textColor = currentTheme.split(' ')[2];
  const badgeBg = currentTheme.split(' ')[4];

  return (
    <div className="min-h-screen bg-white selection:bg-purple-100 selection:text-purple-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${btnColor} flex items-center justify-center text-white font-black text-lg`}>
              {data.businessName?.[0] || 'R'}
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">{data.businessName}</span>
          </div>
          <Button 
            onClick={() => window.open(data.googleReviewLink, '_blank')}
            className={`h-12 px-8 rounded-xl text-white font-black text-sm shadow-xl ${btnColor} ${shadowColor} hover:scale-105 transition-all active:scale-95`}
          >
            {s.cta || 'Leave a Review'}
          </Button>
        </div>
      </nav>

      <main className="pt-40 pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${badgeBg} border-transparent animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <Star className={`w-4 h-4 ${textColor} fill-current`} />
            <span className={`text-[11px] font-black uppercase tracking-widest ${textColor}`}>Top Rated Business</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {s.title || `The Best Experience at ${data.businessName}`}
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            {s.description || `We pride ourselves on providing exceptional quality and customer satisfaction. Join our community of happy clients today.`}
          </p>

          <div className="pt-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
             <Button 
               onClick={() => window.open(data.googleReviewLink, '_blank')}
               className={`h-16 px-12 rounded-3xl text-xl font-black text-white shadow-2xl flex items-center gap-4 mx-auto hover:scale-105 transition-all active:scale-95 ${btnColor} ${shadowColor}`}
             >
               {s.cta || 'Get Started Now'}
               <ArrowRight className="w-6 h-6" />
             </Button>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mt-40 border-y border-slate-50 bg-slate-50/30 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { label: '5.0 Star Rating', desc: 'Consistently rated as a top-tier provider in our region.' },
                 { label: 'Verified Profile', desc: 'Officially recognized Google Business Profile partner.' },
                 { label: 'Fast Response', desc: 'Our team typically responds to all inquiries within 2 hours.' },
               ].map((item, i) => (
                 <div key={i} className="space-y-4 text-center md:text-left">
                    <div className={`w-12 h-12 rounded-2xl ${badgeBg} flex items-center justify-center`}>
                       <Sparkles className={`w-6 h-6 ${textColor}`} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">{item.label}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-slate-50">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4">Powered by ReviewFlow AI</p>
            <p className="text-slate-900 font-bold text-sm">© {new Date().getFullYear()} {data.businessName}. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-3xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}
