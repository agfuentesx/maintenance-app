"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useModules } from "@/hooks/use-modules";
import { AppShell, useMobileMenu } from "@/components/layout/app-shell";
import { TopBar } from "@/components/layout/top-bar";
import { ModuleCard } from "@/components/dashboard/module-card";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DashboardFilterBar, applyFilters } from "@/components/dashboard/dashboard-filter-bar";
import type { DashboardFilters } from "@/components/dashboard/dashboard-filter-bar";
import { RefreshIcon } from "@/components/ui/icons";

const EMPTY_FILTERS: DashboardFilters = { linea: "", module: "", status: "" };

function DashboardContent() {
  const toggleMenu = useMobileMenu();
  const { modules, isLoading, error, lastUpdated, refresh } = useModules();
  const [filters, setFilters] = useState<DashboardFilters>(EMPTY_FILTERS);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredModules = applyFilters(modules, filters);
  const isFiltering = filters.linea !== "" || filters.module !== "" || filters.status !== "";

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

        {/* Summary stats — always based on all modules, not the filtered set */}
        {modules.length > 0 && <DashboardSummary modules={modules} />}

        {/* Filters */}
        {modules.length > 0 && (
          <DashboardFilterBar
            modules={modules}
            filters={filters}
            onChange={setFilters}
          />
        )}

        {/* No-results message when filters produce an empty set */}
        {isFiltering && filteredModules.length === 0 && modules.length > 0 && (
          <div className="py-16 text-center">
            <p className="text-white/30 font-body text-sm mb-1">
              Sin resultados para los filtros aplicados
            </p>
            <button
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="mt-3 text-xs font-mono text-brand-400 hover:text-brand-300 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Module cards or initial empty state */}
        {modules.length === 0 && !isLoading ? (
          <EmptyState onRefresh={refresh} isLoading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredModules.map((mod, i) => (
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
