"use client";

import type { EnrichedModule, MaintenanceStatus } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardFilters {
  linea: string;   // "" = all
  module: string;  // "" = all
  status: string;  // "" = all
}

interface DashboardFilterBarProps {
  modules: EnrichedModule[];
  filters: DashboardFilters;
  onChange: (filters: DashboardFilters) => void;
}

// ─── Status display config ────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: MaintenanceStatus | ""; label: string }[] = [
  { value: "",          label: "Todos los estados" },
  { value: "ok",        label: "Bien" },
  { value: "due-soon",  label: "Requiere mantenimiento" },
  { value: "overdue",   label: "Mantenimiento vencido" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function DashboardFilterBar({ modules, filters, onChange }: DashboardFilterBarProps) {
  // Derive unique sorted line names from loaded modules
  const lineOptions = Array.from(
    new Set(modules.map((m) => m.lineKey))
  ).sort();

  // Derive unique sorted module names, respecting the current line filter
  const moduleOptions = Array.from(
    new Set(
      modules
        .filter((m) => !filters.linea || m.lineKey === filters.linea)
        .map((m) => m.module)
    )
  ).sort();

  function set(patch: Partial<DashboardFilters>) {
    const next = { ...filters, ...patch };
    // Reset module selection when line changes, to avoid orphaned value
    if (patch.linea !== undefined && patch.linea !== filters.linea) {
      next.module = "";
    }
    onChange(next);
  }

  const hasActiveFilters =
    filters.linea !== "" || filters.module !== "" || filters.status !== "";

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {/* ── Línea ── */}
      <FilterSelect
        value={filters.linea}
        onChange={(v) => set({ linea: v })}
        disabled={modules.length === 0}
        aria-label="Filtrar por línea"
      >
        <option value="">Todas las líneas</option>
        {lineOptions.map((key) => (
          <option key={key} value={key}>
            {formatLineLabel(key)}
          </option>
        ))}
      </FilterSelect>

      {/* ── Módulo ── */}
      <FilterSelect
        value={filters.module}
        onChange={(v) => set({ module: v })}
        disabled={modules.length === 0}
        aria-label="Filtrar por módulo"
      >
        <option value="">Todos los módulos</option>
        {moduleOptions.map((mod) => (
          <option key={mod} value={mod}>
            {mod}
          </option>
        ))}
      </FilterSelect>

      {/* ── Estado ── */}
      <FilterSelect
        value={filters.status}
        onChange={(v) => set({ status: v })}
        disabled={modules.length === 0}
        aria-label="Filtrar por estado"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </FilterSelect>

      {/* ── Clear button ── */}
      {hasActiveFilters && (
        <button
          onClick={() => onChange({ linea: "", module: "", status: "" })}
          className="px-3 py-2 rounded-lg text-xs font-mono text-white/40 hover:text-white/70 hover:bg-white/5 border border-white/8 transition-all"
        >
          Limpiar filtros ✕
        </button>
      )}
    </div>
  );
}

// ─── Helper sub-component ─────────────────────────────────────────────────────

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
}

function FilterSelect({ value, onChange, disabled, children, "aria-label": ariaLabel }: FilterSelectProps) {
  const isActive = value !== "";
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        px-3 py-2 rounded-lg text-xs font-mono border transition-all outline-none cursor-pointer
        bg-white/3 text-white/60 hover:bg-white/6 hover:text-white/80
        disabled:opacity-30 disabled:cursor-not-allowed
        ${isActive
          ? "border-brand-500/30 bg-brand-500/8 text-brand-300"
          : "border-white/8"
        }
      `}
    >
      {children}
    </select>
  );
}

// ─── Filter logic (pure function, exported for use in page) ───────────────────

export function applyFilters(
  modules: EnrichedModule[],
  filters: DashboardFilters
): EnrichedModule[] {
  return modules.filter((m) => {
    if (filters.linea  && m.lineKey  !== filters.linea)  return false;
    if (filters.module && m.module   !== filters.module) return false;
    if (filters.status && m.status   !== filters.status) return false;
    return true;
  });
}

// ─── Util ─────────────────────────────────────────────────────────────────────

function formatLineLabel(lineKey: string): string {
  const num = lineKey.replace("line_", "");
  return `Línea ${num}`;
}
