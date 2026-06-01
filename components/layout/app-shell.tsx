"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { CloseIcon } from "@/components/ui/icons";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-975 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative z-10 animate-slide-in">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 text-white"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Expose toggle for child pages via data attribute pattern — 
            children receive a toggleMenu fn via context or prop drilling is avoided
            by using a custom event */}
        <div className="flex-1 overflow-y-auto">
          {/* Pass the menu toggle down via a wrapper that listens */}
          <MobileMenuContext.Provider value={() => setMobileOpen(true)}>
            {children}
          </MobileMenuContext.Provider>
        </div>
      </main>
    </div>
  );
}

// Small context to pass menu toggle to TopBar inside page components
import { createContext, useContext } from "react";

export const MobileMenuContext = createContext<() => void>(() => {});

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}
