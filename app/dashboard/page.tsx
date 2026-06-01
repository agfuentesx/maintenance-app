"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useModules } from "@/hooks/use-modules";
import { AppShell, useMobileMenu } from "@/components/layout/app-shell";
import { TopBar } from "@/components/layout/top-bar";
import { ModuleCard } from "@/components/dashboard/module-card";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { EmptyState } from "@/components/dashboard/empty-state";
import { RefreshIcon } from "@/components/ui/icons";

function DashboardContent() {
  const toggleMenu = useMobileMenu();
  const { modules, isLoading, error, lastUpdated, refresh } = useModules();

  // Auto-load on mount
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshButton = (
    <button
      onClick={refresh}
      disabled={isLoading}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-body hover:bg-brand-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshIcon className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
      {isLoading ? "Actualizando..." : "Actualizar"}
    </button>
  );

  return (
    <>
      <TopBar
        title="Dashboard"
        onMenuToggle={toggleMenu}
        actions={refreshButton}
      />
      <div className="p-4 md:p-6">
        {/* Last updated timestamp */}
        {lastUpdated && (
          <p className="text-[11px] font-mono text-white/20 mb-4 uppercase tracking-widest">
            Última actualización: {lastUpdated.toLocaleTimeString("es-ES")}
          </p>
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm font-body">
            ⚠ {error}
          </div>
        )}

        {/* Summary stats */}
        {modules.length > 0 && <DashboardSummary modules={modules} />}

        {/* Module cards or empty state */}
        {modules.length === 0 && !isLoading ? (
          <EmptyState onRefresh={refresh} isLoading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <div
                key={mod.id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-fade-in"
              >
                <ModuleCard module={mod} />
              </div>
            ))}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && modules.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-white/3 border border-white/5 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  );
}
