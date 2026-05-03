import { CheckCircle2, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const bullets = [
  "Get 4x more 5-star reviews within the first 30 days.",
  "AI Agent handles responses, saving you 10+ hours weekly.",
  "Proven methodology used by 500+ top-tier agencies.",
  "Boost map visibility by up to 300% with local signals."
];

export default function WhySection() {
  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2 relative order-2 lg:order-1">
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-100/50 rounded-full blur-3xl -z-10" />
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 space-y-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h4 className="font-bold text-slate-900 text-lg">Ranking Boost</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Dynamic local SEO signals keep you at the top.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 space-y-4 translate-y-10">
              <Users className="w-8 h-8 text-purple-600" />
              <h4 className="font-bold text-slate-900 text-lg">Social Proof</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Showcase your best reviews automatically.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 space-y-4">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-lg">Safe Growth</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Google-compliant methods only. Zero risk.</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 order-1 lg:order-2">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            Why Agencies & Businesses Love ReviewFlow AI
          </h2>
          
          <div className="space-y-6 mb-12">
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="mt-1 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-lg text-slate-600 font-medium">{bullet}</p>
              </div>
            ))}
          </div>

          <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            Learn the Strategy
          </button>
        </div>
      </div>
    </section>
  );
}
