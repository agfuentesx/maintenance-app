"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { NAV_ITEMS } from "@/lib/nav-config";
import {
  DashboardIcon,
  FormIcon,
  ProfileIcon,
  LogoutIcon,
  ShieldIcon,
} from "@/components/ui/icons";

interface SidebarProps {
  onClose?: () => void;
}

function getIcon(icon: string) {
  switch (icon) {
    case "dashboard": return <DashboardIcon />;
    case "form":      return <FormIcon />;
    case "profile":   return <ProfileIcon />;
    default:          return null;
  }
}

export function Sidebar({ onClose }: SidebarProps) {
  const { role, logout } = useAuth();
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || role === "admin"
  );

  return (
    <aside className="flex flex-col h-full bg-slate-925 border-r border-white/5 w-64">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <ShieldIcon className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-display text-white text-sm leading-tight">Mantenimiento</p>
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">Sistema</p>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-6 py-3">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border ${
          role === "admin"
            ? "bg-brand-500/10 text-brand-300 border-brand-500/30"
            : "bg-white/5 text-white/40 border-white/10"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${role === "admin" ? "bg-brand-400" : "bg-white/30"}`} />
          {role === "admin" ? "Administrador" : "Visitante"}
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-150 group ${
                isActive
                  ? "bg-brand-500/15 text-brand-300 border border-brand-500/20"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className={`transition-colors ${isActive ? "text-brand-400" : "text-white/30 group-hover:text-white/60"}`}>
                {getIcon(item.icon)}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-150 font-body"
        >
          <LogoutIcon className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
