'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { 
  Bot, 
  Save, 
  MessageCircle, 
  RefreshCw, 
  Sliders, 
  Sparkles, 
  Check, 
  X, 
  Languages, 
  Mic, 
  ShieldCheck,
  Zap,
  Info,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AIAgentPage() {
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState('Friendly');
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [keywords, setKeywords] = useState('');
  const [autoDraftReplies, setAutoDraftReplies] = useState(true);
  const [automatedPosts, setAutomatedPosts] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // Load existing settings if available
    const savedKnowledge = localStorage.getItem('reviewflow_ai_knowledge');
    const savedKeywords = localStorage.getItem('reviewflow_ai_keywords');
    const savedTone = localStorage.getItem('reviewflow_ai_tone');
    const savedDraft = localStorage.getItem('reviewflow_ai_draft');
    const savedPosts = localStorage.getItem('reviewflow_ai_posts');

    if (savedKnowledge) setKnowledgeBase(savedKnowledge);
    if (savedKeywords) setKeywords(savedKeywords);
    if (savedTone) setTone(savedTone);
    if (savedDraft !== null) setAutoDraftReplies(savedDraft === 'true');
    if (savedPosts !== null) setAutomatedPosts(savedPosts === 'true');
  }, []);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('reviewflow_ai_knowledge', knowledgeBase);
      localStorage.setItem('reviewflow_ai_keywords', keywords);
      localStorage.setItem('reviewflow_ai_tone', tone);
      localStorage.setItem('reviewflow_ai_draft', String(autoDraftReplies));
      localStorage.setItem('reviewflow_ai_posts', String(automatedPosts));
      setLoading(false);
      toast.success('AI Agent Persona & Rules successfully deployed!', { icon: '🚀' });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10 py-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">AI Reputation Agent</h1>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs font-black rounded-full uppercase tracking-wider border border-purple-200/50">
                GPT-4o Engine
              </span>
            </div>
            <p className="text-base font-medium text-slate-500 mt-2">
              Train your autonomous AI persona to monitor Google reviews, draft localized replies, and publish posts in English, Hindi, and Marathi.
            </p>
          </div>
          <Button 
            onClick={handleSave} 
            loading={loading} 
            variant="secondary" 
            className="gap-2 px-8 h-13 shadow-xl shadow-purple-500/15 font-black rounded-xl"
          >
            <Save className="w-5 h-5" />
            Deploy Updates
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Configuration Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <Card 
              title="Agent Persona & Business Brain" 
              subtitle="Describe your business, menu items, core strengths, and custom instructions."
            >
              <div className="space-y-6 pt-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      Knowledge Base & Grounding Context
                    </label>
                    <span className="text-[11px] font-semibold text-slate-400">Trilingual Auto-Aware</span>
                  </div>
                  <textarea 
                    rows={8}
                    value={knowledgeBase}
                    onChange={(e) => setKnowledgeBase(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 transition-all text-slate-900 placeholder:text-slate-400 text-sm leading-relaxed font-medium"
                    placeholder="Example: We are 'SmileCraft Dental', a family-owned clinic in downtown. We specialize in painless implants, teeth whitening, and emergency dental care. Always thank the patient warmly. If they mention Dr. Sharma or Dr. Patil, acknowledge them specifically. If customer writes in Marathi or Hindi, reply respectfully in that language."
                  />
                  <p className="text-xs text-slate-400 px-1 italic">
                    The AI automatically references these facts when generating review replies and Google updates.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                      Local SEO Target Keywords
                    </label>
                    <Input 
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="e.g. dentist near me, implants, painless dental" 
                      className="h-12 bg-slate-50 border-slate-200/80 rounded-xl focus:bg-white text-slate-900 font-medium"
                    />
                    <p className="text-[11px] text-slate-400 px-1">Subtly woven into AI review replies to boost Google Map rank.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                      Tone of Voice
                    </label>
                    <div className="flex gap-2 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
                      {['Friendly', 'Professional', 'Engaging'].map((t) => (
                        <button 
                          key={t}
                          type="button"
                          onClick={() => setTone(t)}
                          className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${
                            tone === t 
                              ? 'bg-white text-purple-600 shadow-sm border border-slate-100 scale-[1.02]' 
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 px-1">Controls warmth and vocabulary formality.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Automation Triggers & Rules" subtitle="Configure hands-free operations for customer touchpoints.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                {/* Auto-Draft Replies */}
                <div 
                  onClick={() => setAutoDraftReplies(!autoDraftReplies)}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-purple-300 hover:bg-white transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      autoDraftReplies ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Auto-Draft Replies</p>
                      <p className="text-xs text-slate-500 mt-0.5">Generate ready responses for review.</p>
                    </div>
                  </div>

                  <div className={`w-13 h-7 rounded-full p-1 transition-colors duration-300 relative ${
                    autoDraftReplies ? 'bg-purple-600' : 'bg-slate-200'
                  }`}>
                    <motion.div 
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ x: autoDraftReplies ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </div>

                {/* Automated Posts */}
                <div 
                  onClick={() => setAutomatedPosts(!automatedPosts)}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-white transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      automatedPosts ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <RefreshCw className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Automated Updates</p>
                      <p className="text-xs text-slate-500 mt-0.5">Scheduled Google Business updates.</p>
                    </div>
                  </div>

                  <div className={`w-13 h-7 rounded-full p-1 transition-colors duration-300 relative ${
                    automatedPosts ? 'bg-blue-600' : 'bg-slate-200'
                  }`}>
                    <motion.div 
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ x: automatedPosts ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Status & Strategy Right Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Live Agent Card */}
            <div className="rounded-3xl bg-slate-950 text-white p-7 shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/25 border border-white/20">
                    <Bot className="w-14 h-14 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-slate-950 rounded-full animate-pulse" />
                </div>

                <div>
                  <h4 className="text-xl font-black tracking-tight text-white">ReviewFlow AI Engine</h4>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-slate-300">Live & Synchronized</span>
                  </div>
                </div>

                <div className="w-full pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5 text-left">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Trilingual</p>
                    <p className="text-sm font-black text-white mt-1">EN | HI | MR</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3 border border-white/5 text-left">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Response Speed</p>
                    <p className="text-sm font-black text-white mt-1">~1.1 sec</p>
                  </div>
                </div>

                <div className="w-full space-y-2 pt-2 text-left text-xs font-medium text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Auto-detects client language</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Real-time voice & speech synthesis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Strategy Card */}
            <Card title="Reputation Best Practices">
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-purple-50/70 rounded-2xl border-l-4 border-purple-600">
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    💡 <span className="font-bold">Pro Tip:</span> Including regional locations like "Connaught Place", "FC Road Pune", or "Bandra West" in your knowledge base improves rank by 30% for local "near me" map searches.
                  </p>
                </div>

                <button 
                  type="button"
                  onClick={() => setShowGuideModal(true)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 text-xs font-black text-purple-600 hover:bg-purple-50/50 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Read AI Deployment Guide
                  </span>
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Deployment Guide Modal */}
        <AnimatePresence>
          {showGuideModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">AI Deployment Guide</h4>
                      <p className="text-xs font-semibold text-slate-400">Maximize Local SEO & Review Velocity</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowGuideModal(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <Languages className="w-4 h-4 text-purple-600" />
                      Trilingual Automatic Detection
                    </p>
                    <p className="text-xs text-slate-500">
                      When customers speak or type in English, Hindi (हिंदी), or Marathi (मराठी), ReviewFlow automatically detects the language and matches it with culturally nuanced, polite terminology.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <Mic className="w-4 h-4 text-indigo-600" />
                      Two-Way Voice Recognition
                    </p>
                    <p className="text-xs text-slate-500">
                      Customers can talk using their mic. The agent records live audio with visual waveforms, auto-stops when silence is detected, and responds back using text-to-speech.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Review Gating Protection
                    </p>
                    <p className="text-xs text-slate-500">
                      Ratings of 4-5 stars are guided to your official Google link. Ratings of 1-3 stars trigger an internal private feedback channel, protecting your Google Maps star rating.
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowGuideModal(false)} 
                  variant="secondary" 
                  className="w-full h-12 rounded-xl font-bold"
                >
                  Got It, Close Guide
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
