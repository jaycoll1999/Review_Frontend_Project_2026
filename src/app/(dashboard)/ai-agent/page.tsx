'use client';
import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Bot, Save, MessageCircle, RefreshCw, Sliders, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AIAgentPage() {
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState('Friendly');

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('AI Agent configuration updated!');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10 py-4">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Reputation Agent</h1>
            <p className="text-lg font-medium text-slate-500 mt-2">Configure how your AI interacts with customers and manages your profile.</p>
          </div>
          <Button onClick={handleSave} loading={loading} variant="secondary" className="gap-2 px-8 shadow-lg shadow-slate-200">
            <Save className="w-5 h-5" />
            Deploy Updates
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <Card title="Agent Persona" subtitle="Tell the AI how to describe your business and respond to customers.">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 px-1">Knowledge Base / Instructions</label>
                  <textarea 
                    rows={10}
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-200 transition-all text-slate-900 placeholder:text-slate-300 text-base leading-relaxed font-medium"
                    placeholder="Example: We are a high-end sushi restaurant in downtown NYC. We pride ourselves on fresh ingredients and traditional techniques. Always be polite, thank customers for their visits, and invite them back soon."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 px-1">Target Keywords</label>
                    <Input 
                      placeholder="sushi, fresh, NYC, omakase" 
                      className="h-14 bg-slate-50 border-slate-100 rounded-2xl"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 px-1">Response Tone</label>
                    <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                      {['Friendly', 'Professional', 'Engaging'].map((t) => (
                        <button 
                          key={t}
                          onClick={() => setTone(t)}
                          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                            tone === t 
                              ? 'bg-white text-purple-600 shadow-md border border-slate-100 scale-[1.02]' 
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Automation Rules">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-purple-200 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-sm border border-slate-100 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <MessageCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-base">Auto-Draft Replies</p>
                      <p className="text-xs font-medium text-slate-500 mt-1">Review AI drafts before posting.</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <RefreshCw className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-base">Automated Posts</p>
                      <p className="text-xs font-medium text-slate-500 mt-1">Generate weekly Google updates.</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <Card className="bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden" title="Agent Status">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />
              
              <div className="relative py-8 flex flex-col items-center text-center space-y-8">
                <div className="relative">
                  <div className="w-40 h-40 bg-purple-600/10 rounded-[3rem] flex items-center justify-center border border-white/5 backdrop-blur-sm">
                    <div className="w-28 h-28 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(147,51,234,0.3)] border border-white/20">
                      <Bot className="w-14 h-14 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-7 h-7 bg-green-500 border-[6px] border-slate-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-2xl font-black tracking-tight">ReviewFlow Agent</h4>
                  <p className="text-slate-400 font-medium text-sm mt-2 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Live & Fully Operational
                  </p>
                </div>
                <div className="w-full h-[1px] bg-white/5" />
                <div className="grid grid-cols-2 gap-8 w-full px-4">
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Accuracy</p>
                    <p className="text-2xl font-black mt-1">99.8%</p>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Response</p>
                    <p className="text-2xl font-black mt-1">~1.2s</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="AI Strategy Tips">
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-purple-600">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    "Adding specific staff names and unique selling points (USPs) helps the AI generate more authentic sounding responses."
                  </p>
                </div>
                <Button variant="ghost" className="w-full justify-between text-purple-600 hover:text-purple-700">
                  Read Deployment Guide
                  <Bot className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
