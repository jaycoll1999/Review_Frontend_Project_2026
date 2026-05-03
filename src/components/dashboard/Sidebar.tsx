"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  QrCode,
  Link as LinkIcon,
  Bot,
  Settings,
  CreditCard,
  MessageSquare,
  Globe,
  Search,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Magic QR", icon: QrCode, href: "/magic-qr" },
  { name: "Magic Link", icon: LinkIcon, href: "/magic-link" },
  { name: "Google Automation", icon: MessageSquare, href: "/automation" },
  { name: "Google Audit", icon: Search, href: "/audit" },
  { name: "AI Posts", icon: Globe, href: "/ai-posts" },
  { name: "AI Agent", icon: Bot, href: "/ai-agent" },
  { name: "Plans", icon: CreditCard, href: "/plans" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r h-screen fixed left-0 top-0 z-50 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            R
          </div>
          ReviewFlow AI
        </h1>
      </div>
      <nav className="px-4 pb-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
