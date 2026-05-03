import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  QrCode, 
  Link2, 
  Bot, 
  Search, 
  PenTool, 
  Globe, 
  CreditCard, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Magic QR', href: '/magic-qr', icon: QrCode },
  { name: 'Magic Link', href: '/magic-link', icon: Link2 },
  { name: 'Google Automation', href: '/automation', icon: Bot },
  { name: 'Google Audit', href: '/audit', icon: Search },
  { name: 'AI Posts', href: '/ai-posts', icon: PenTool },
  { name: 'Website', href: '/website', icon: Globe },
  { name: 'Plans', href: '/plans', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ReviewFlow AI
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Free Plan</p>
          <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-1/3"></div>
          </div>
          <p className="mt-2 text-xs text-slate-600">3 of 10 reviews used</p>
          <button className="mt-3 w-full py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
