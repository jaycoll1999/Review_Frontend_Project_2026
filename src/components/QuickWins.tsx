import { Zap, Rocket, Target } from 'lucide-react';

const wins = [
  "Auto-post weekly updates to your Google Profile.",
  "Respond to positive reviews within 5 minutes with AI.",
  "Filter out negative reviews with private feedback forms.",
  "Generate high-intent leads via your review funnel."
];

export default function QuickWins() {
  return (
    <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold mb-8 border border-white/10">
            <Rocket className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400">INSTANT IMPACT</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-8 leading-tight">
            Quick Wins That Drive Results
          </h2>
          
          <div className="space-y-6 mb-12">
            {wins.map((win, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                <Target className="w-6 h-6 text-purple-400" />
                <p className="text-lg font-medium text-slate-200">{win}</p>
              </div>
            ))}
          </div>

          <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50">
            See All Quick Wins
          </button>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="bg-white/10 p-4 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group">
            <div className="bg-slate-800 rounded-2xl p-8 border border-white/5">
              <div className="flex items-center justify-between mb-10">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-white/10" />)}
                </div>
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/5 rounded-xl animate-shimmer" />
                    <div className="flex-1 space-y-2">
                      <div className="w-2/3 h-2 bg-white/10 rounded-full" />
                      <div className="w-1/2 h-2 bg-white/5 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
