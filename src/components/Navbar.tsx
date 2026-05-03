import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <span className="font-bold text-xl">R</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            ReviewFlow<span className="text-blue-600">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
          <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="/login" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
