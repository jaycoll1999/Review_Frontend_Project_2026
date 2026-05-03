export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <span className="font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ReviewFlow<span className="text-blue-600">AI</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
            Helping local businesses automate their reputation and dominate Google Search with Agentic AI.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Product</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">AI Agent</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Magic QR</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Integrations</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Connect</h4>
          <p className="text-sm text-slate-500 mb-4">Subscribe to our newsletter for growth tips.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email"
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-slate-400">© 2026 ReviewFlow AI. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><span className="text-xs font-bold uppercase tracking-widest">Twitter</span></a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span></a>
          <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><span className="text-xs font-bold uppercase tracking-widest">Facebook</span></a>
        </div>
      </div>
    </footer>
  );
}
