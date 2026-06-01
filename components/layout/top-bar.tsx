"use client";

import { MenuIcon } from "@/components/ui/icons";

interface TopBarProps {
  title: string;
  onMenuToggle: () => void;
  actions?: React.ReactNode;
}

export function TopBar({ title, onMenuToggle, actions }: TopBarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-white/5 bg-slate-925/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-1.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        <h1 className="font-display text-white text-base md:text-lg">{title}</h1>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
