'use client';
import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Share2, Eye, Zap, Sparkles, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';
import { toPng } from 'html-to-image';

export default function QRPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const qrRef = useRef<SVGSVGElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("QR Auth Error:", e);
      }
    }
  }, []);

  const funnelUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${user?.id}`;

  const templates = [
    { id: 1, name: 'Google Classic', color: 'border-transparent', bg: 'bg-white', theme: 'multi' },
    { id: 2, name: 'Pixel Modern', color: 'border-blue-500', bg: 'bg-white', theme: 'blue' },
    { id: 3, name: 'Search Dark', color: 'border-slate-800', bg: 'bg-slate-900', theme: 'dark' },
    { id: 4, name: 'Map Emerald', color: 'border-green-500', bg: 'bg-green-50', theme: 'green' },
    { id: 5, name: 'Assistant Amber', color: 'border-yellow-400', bg: 'bg-amber-50', theme: 'yellow' },
    { id: 6, name: 'Review Red', color: 'border-red-500', bg: 'bg-red-50', theme: 'red' },
  ];

  const downloadPoster = async () => {
    if (!posterRef.current) return;
    
    const toastId = toast.loading('Generating high-res design...');
    try {
      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(posterRef.current, { 
        quality: 1.0,
        pixelRatio: 3, // High quality for print
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `reviewflow-poster-template-${selectedTemplate}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Print-ready design downloaded!', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate design.', { id: toastId });
    }
  };

  const downloadQRCodeOnly = async () => {
    const el = document.getElementById('qr-code-download-wrapper');
    if (!el) return;
    
    const toastId = toast.loading('Extracting QR Code...');
    try {
      const dataUrl = await toPng(el, { 
        quality: 1.0,
        pixelRatio: 4, 
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `reviewflow-qr-only.png`;
      link.href = dataUrl;
      link.click();
      toast.success('QR Code Only downloaded!', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Failed to export QR.', { id: toastId });
    }
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10 py-4">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Magic QR Generator</h1>
            <p className="text-lg font-medium text-slate-500 mt-2">Generate high-converting QR designs for your physical location.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2 px-6">
              <Share2 className="w-4 h-4" />
              Share Funnel
            </Button>
            <Button onClick={() => window.open(funnelUrl, '_blank')} variant="secondary" className="flex items-center gap-2 px-6">
              <Eye className="w-4 h-4" />
              Live Preview
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Card className="flex flex-col items-center justify-center py-12 px-10 border-none shadow-purple-100/20 overflow-hidden">
              <div className="relative group scale-[0.85] origin-top">
                {/* Template Visual wrapper */}
                <div 
                  ref={posterRef}
                  className={`relative w-[400px] aspect-[1/1.414] rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500 border-[16px] ${currentTemplate.bg} ${currentTemplate.color}`}
                >
                  
                  {/* Google Colors Decoration */}
                  {currentTemplate.id === 1 && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-4 bg-[#4285F4]" />
                      <div className="absolute top-0 right-0 h-full w-4 bg-[#34A853]" />
                      <div className="absolute bottom-0 left-0 w-full h-4 bg-[#FBBC05]" />
                      <div className="absolute top-0 left-0 h-full w-4 bg-[#EA4335]" />
                    </>
                  )}

                  {currentTemplate.id === 2 && (
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent" />
                  )}

                  {currentTemplate.id === 3 && (
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-30" />
                  )}

                  <div className="h-full flex flex-col items-center justify-between p-12 text-center relative z-10">
                    <div className="space-y-4">
                      <p className={`text-sm font-black uppercase tracking-[0.3em] ${currentTemplate.id === 3 ? 'text-slate-400' : 'text-slate-500'}`}>Review us on</p>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-4xl font-bold text-[#4285F4]">G</span>
                        <span className="text-4xl font-bold text-[#EA4335]">o</span>
                        <span className="text-4xl font-bold text-[#FBBC05]">o</span>
                        <span className="text-4xl font-bold text-[#4285F4]">g</span>
                        <span className="text-4xl font-bold text-[#34A853]">l</span>
                        <span className="text-4xl font-bold text-[#EA4335]">e</span>
                      </div>
                      <div className="flex justify-center gap-1">
                        {[1,2,3,4,5].map(star => (
                          <Sparkles key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <div 
                      id="qr-code-download-wrapper"
                      className={`relative p-6 rounded-3xl shadow-sm border ${currentTemplate.id === 3 ? 'bg-white border-slate-700' : 'bg-white border-slate-100'}`}
                    >
                      <QRCodeSVG 
                        value={funnelUrl} 
                        size={180}
                        level="H"
                        includeMargin={false}
                      />
                    </div>

                    <div className="space-y-2">
                      <p className={`text-xl font-black tracking-tight ${currentTemplate.id === 3 ? 'text-white' : 'text-slate-900'}`}>
                        {user?.businessName || 'Your Business'}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1 w-4 rounded-full bg-[#4285F4]" />
                        <div className="h-1 w-4 rounded-full bg-[#EA4335]" />
                        <div className="h-1 w-4 rounded-full bg-[#FBBC05]" />
                        <div className="h-1 w-4 rounded-full bg-[#34A853]" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">Scan to Share Feedback</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center w-full px-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Button onClick={downloadPoster} variant="primary" className="flex-1 gap-2 shadow-purple-200 h-14">
                    <Download className="w-5 h-5" />
                    Print Ready Design
                  </Button>
                  <Button onClick={downloadQRCodeOnly} variant="outline" className="flex-1 gap-2 h-14 border-slate-200 hover:bg-slate-50">
                    <QrCode className="w-5 h-5" />
                    QR Only
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <Card title="Visual Templates" subtitle="Select a premium design for your print-outs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {templates.map(template => (
                  <div 
                    key={template.id} 
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`group relative aspect-[3/4] rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm ${
                      selectedTemplate === template.id 
                        ? 'border-purple-600 ring-4 ring-purple-50 shadow-purple-100' 
                        : 'border-slate-100 hover:border-purple-200'
                    }`}
                  >
                    <div className={`absolute inset-0 p-3 flex flex-col items-center justify-between border-8 ${template.bg} ${template.color}`}>
                      {template.id === 1 && (
                        <>
                          <div className="absolute top-0 left-0 w-full h-2 bg-[#4285F4]" />
                          <div className="absolute top-0 right-0 h-full w-2 bg-[#34A853]" />
                          <div className="absolute bottom-0 left-0 w-full h-2 bg-[#FBBC05]" />
                          <div className="absolute top-0 left-0 h-full w-2 bg-[#EA4335]" />
                        </>
                      )}
                      
                      <div className="flex items-center justify-center gap-0.5 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                      </div>

                      <div className={`w-10 h-10 rounded-lg ${template.id === 3 ? 'bg-slate-800' : 'bg-slate-50'} border border-dashed border-slate-300 flex items-center justify-center`}>
                        <QrCode className={`w-4 h-4 ${template.id === 3 ? 'text-slate-600' : 'text-slate-300'}`} />
                      </div>
                      <p className={`text-[8px] font-black uppercase tracking-widest ${template.id === 3 ? 'text-slate-500' : 'text-slate-400'}`}>{template.name}</p>
                    </div>

                    {selectedTemplate === template.id && (
                      <div className="absolute top-3 right-3 bg-purple-600 text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase z-10 shadow-lg">Active</div>
                    )}
                    <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/5 transition-colors" />
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Production Settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-purple-200 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="w-12 h-6 bg-purple-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-900 tracking-tight">Dynamic Tracking</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Track real-time scans and geographic performance.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-900 tracking-tight">Professional Print DPI</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Download in 600 DPI vector-ready format.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
