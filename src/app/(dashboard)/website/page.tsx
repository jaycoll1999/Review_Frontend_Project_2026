'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import api from '@/lib/api';
import { 
  Globe, 
  Layout, 
  Palette, 
  Zap, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Type, 
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Trash2,
  Settings,
  Copy,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function WebsitePage() {
  const [activeTab, setActiveTab] = useState('Content');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [theme, setTheme] = useState('purple');
  const [user, setUser] = useState<any>(null);

  // Content States
  const [siteTitle, setSiteTitle] = useState('Experience Excellence at Our Location');
  const [siteDesc, setSiteDesc] = useState('Proudly serving our community with 5-star rated service and expert care.');
  const [ctaText, setCtaText] = useState('Book Appointment');
  const [layout, setLayout] = useState('Modern Split');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        
        // Load saved settings if they exist
        if (parsed.websiteSettings) {
          const s = typeof parsed.websiteSettings === 'string' ? JSON.parse(parsed.websiteSettings) : parsed.websiteSettings;
          if (s.title) setSiteTitle(s.title);
          if (s.description) setSiteDesc(s.description);
          if (s.cta) setCtaText(s.cta);
          if (s.theme) setTheme(s.theme);
          if (s.layout) setLayout(s.layout);
        }
      } catch (e) {
        console.error("Website Auth Error:", e);
      }
    }
  }, []);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    const websiteSettings = {
      title: siteTitle,
      description: siteDesc,
      cta: ctaText,
      theme,
      layout,
      lastPublished: new Date().toISOString()
    };

    try {
      const res = await api.put('/user/website', { websiteSettings });
      
      // Update local storage
      const updatedUser = { ...user, websiteSettings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success('Website published successfully! 🎉');
    } catch (err) {
      console.error(err);
      toast.error('Failed to publish website.');
    } finally {
      setIsPublishing(false);
    }
  };

  const themes = [
    { id: 'purple', color: 'bg-purple-600' },
    { id: 'blue', color: 'bg-blue-600' },
    { id: 'emerald', color: 'bg-emerald-600' },
    { id: 'slate', color: 'bg-slate-900' },
  ];

  const shareableUrl = user ? `${window.location.origin}/site/${user.id}` : '';

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 py-4">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Site Builder</h1>
            <p className="text-sm font-bold text-slate-500">Live Editor: {user?.businessName || 'Your Business'}</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <button 
              onClick={() => setIsMobileView(false)}
              className={`p-2 rounded-xl transition-all ${!isMobileView ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsMobileView(true)}
              className={`p-2 rounded-xl transition-all ${isMobileView ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <Smartphone className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-100 mx-2" />
            <Button 
              onClick={handlePublish} 
              disabled={isPublishing}
              className="h-10 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-100 flex items-center gap-2 text-sm font-bold active:scale-95 transition-all"
            >
              <Zap className={`w-4 h-4 ${isPublishing ? 'animate-spin' : ''}`} />
              {isPublishing ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Editor */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-0 overflow-hidden border-none shadow-xl shadow-slate-200/50">
              <div className="flex border-b border-slate-50">
                {['Layout', 'Content', 'Design', 'Domain'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-[9px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/30' 
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="p-6 space-y-8">
                {activeTab === 'Content' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Headline</label>
                      <input 
                        type="text" 
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                      <textarea 
                        value={siteDesc}
                        onChange={(e) => setSiteDesc(e.target.value)}
                        className="w-full h-24 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-600 outline-none transition-all resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CTA Button Text</label>
                      <input 
                        type="text" 
                        value={ctaText}
                        onChange={(e) => setCtaText(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'Design' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand Color</label>
                      <div className="flex gap-4">
                        {themes.map((t) => (
                          <button 
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${t.color} ${theme === t.id ? 'ring-4 ring-purple-100 scale-110 shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                          >
                            {theme === t.id && <CheckCircle2 className="w-5 h-5 text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Type className="w-5 h-5 text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">Custom Fonts</span>
                      </div>
                      <Settings className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                )}

                {activeTab === 'Layout' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
                    {['Modern Split', 'Review Focused', 'Minimalist Grid'].map((l) => (
                      <button 
                        key={l} 
                        onClick={() => setLayout(l)}
                        className={`w-full p-4 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between border ${
                          layout === l 
                            ? 'bg-purple-600 border-purple-600 text-white' 
                            : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-purple-600'
                        }`}
                      >
                        {l}
                        <ChevronRight className={`w-4 h-4 ${layout === l ? 'text-white' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === 'Domain' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                       <h4 className="text-sm font-black text-slate-900">Live URL</h4>
                       <div className="flex items-center justify-between gap-2 p-3 bg-white rounded-xl border border-slate-100 text-[10px] font-bold text-slate-500 overflow-hidden">
                          <span className="truncate flex-1">{shareableUrl}</span>
                          <button onClick={() => {
                            navigator.clipboard.writeText(shareableUrl);
                            toast.success('URL copied to clipboard!');
                          }} className="p-2 hover:bg-slate-50 rounded-lg shrink-0">
                            <Copy className="w-3 h-3" />
                          </button>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full h-12 rounded-xl text-xs font-bold flex items-center gap-2">
                       <Globe className="w-4 h-4" />
                       Connect Custom Domain
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-slate-900 border-none text-white overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles className="w-20 h-20" />
               </div>
               <h4 className="text-lg font-black mb-1">Preview Helper</h4>
               <p className="text-xs font-bold text-slate-400 mb-6 leading-relaxed">Changes are temporary until you click "Publish".</p>
               <Button onClick={() => window.open(shareableUrl, '_blank')} variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900 font-black h-12 rounded-xl flex items-center gap-2">
                 <ExternalLink className="w-4 h-4" />
                 View Live Site
               </Button>
            </Card>
          </div>

          {/* Live Preview Canvas */}
          <div className="lg:col-span-8 flex justify-center">
            <div className={`transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white rounded-[2.5rem] overflow-hidden border-8 border-slate-100 ${isMobileView ? 'w-[375px]' : 'w-full aspect-[16/10]'}`}>
               {/* Browser UI */}
               <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center px-6 gap-6">
                 <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                 </div>
                 <div className="flex-1 bg-white rounded-lg h-7 flex items-center px-4 text-[10px] text-slate-400 font-bold border border-slate-100">
                    {shareableUrl.replace(/https?:\/\//, '')}
                 </div>
               </div>

               {/* Mock Website Content */}
               <div className="h-full overflow-y-auto scrollbar-hide">
                 <nav className="p-6 flex items-center justify-between border-b border-slate-50">
                   <div className="flex items-center gap-2">
                     <div className={`w-8 h-8 rounded-lg ${theme === 'purple' ? 'bg-purple-600' : theme === 'blue' ? 'bg-blue-600' : theme === 'emerald' ? 'bg-emerald-600' : 'bg-slate-900'} flex items-center justify-center text-white text-xs font-black`}>
                       {user?.businessName?.[0] || 'R'}
                     </div>
                     <span className="text-sm font-black text-slate-900 tracking-tight">{user?.businessName || 'Business Name'}</span>
                   </div>
                   {!isMobileView && (
                     <div className="flex items-center gap-6">
                        {['Services', 'Reviews', 'Contact'].map(link => (
                          <span key={link} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 cursor-pointer">{link}</span>
                        ))}
                        <Button className={`h-8 px-4 rounded-lg text-[10px] font-black text-white ${theme === 'purple' ? 'bg-purple-600' : theme === 'blue' ? 'bg-blue-600' : theme === 'emerald' ? 'bg-emerald-600' : 'bg-slate-900'}`}>
                          {ctaText}
                        </Button>
                     </div>
                   )}
                 </nav>

                 <div className="p-12 text-center space-y-6 mt-12">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${theme === 'purple' ? 'bg-purple-50 border-purple-100 text-purple-600' : theme === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-600' : theme === 'emerald' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-900'}`}>
                     <Star className="w-3 h-3 fill-current" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Top Rated Local Business</span>
                   </div>
                   <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-lg mx-auto">
                     {siteTitle}
                   </h1>
                   <p className="text-base font-medium text-slate-500 max-w-sm mx-auto leading-relaxed">
                     {siteDesc}
                   </p>
                   <div className="pt-4">
                     <Button className={`h-14 px-10 rounded-2xl text-lg font-black text-white shadow-xl flex items-center gap-3 mx-auto ${theme === 'purple' ? 'bg-purple-600 shadow-purple-100' : theme === 'blue' ? 'bg-blue-600 shadow-blue-100' : theme === 'emerald' ? 'bg-emerald-600 shadow-emerald-100' : 'bg-slate-900 shadow-slate-100'}`}>
                       {ctaText}
                       <ArrowRight className="w-5 h-5" />
                     </Button>
                   </div>
                 </div>

                 {/* Social Proof Section */}
                 <div className="px-12 py-16 bg-slate-50/50 mt-12">
                    <div className="flex items-center justify-center gap-8 opacity-40">
                      <div className="h-6 w-24 bg-slate-300 rounded-full" />
                      <div className="h-6 w-24 bg-slate-300 rounded-full" />
                      <div className="h-6 w-24 bg-slate-300 rounded-full" />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
