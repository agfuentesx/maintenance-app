import type { EnrichedModule } from "@/types";
import { formatDate } from "@/lib/maintenance";
import { CheckCircleIcon, WarningIcon, ErrorIcon, CalendarIcon } from "@/components/ui/icons";

interface ModuleCardProps {
  module: EnrichedModule;
}

const STATUS_CONFIG = {
  ok: {
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/20",
    dot: "bg-emerald-400",
    icon: <CheckCircleIcon className="w-5 h-5 text-emerald-400" />,
    label: "Bien",
    headline: (m: EnrichedModule) =>
      `Módulo ${m.module} de ${m.lineName} está bien`,
    glow: "shadow-emerald-500/5",
  },
  "due-soon": {
    border: "border-amber-500/25",
    bg: "bg-amber-500/5",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
    badgeBorder: "border-amber-500/20",
    dot: "bg-amber-400",
    icon: <WarningIcon className="w-5 h-5 text-amber-400" />,
    label: "Requiere mantenimiento",
    headline: (m: EnrichedModule) =>
      `Módulo ${m.module} de ${m.lineName} requiere mantenimiento`,
    glow: "shadow-amber-500/5",
  },
  overdue: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    badgeBg: "bg-red-500/10",
    badgeText: "text-red-400",
    badgeBorder: "border-red-500/20",
    dot: "bg-red-500 animate-pulse-soft",
    icon: <ErrorIcon className="w-5 h-5 text-red-400" />,
    label: "Mantenimiento vencido",
    headline: (m: EnrichedModule) =>
      `Módulo ${m.module} de ${m.lineName} tiene vencido su mantenimiento`,
    glow: "shadow-red-500/10",
  },
};

export function ModuleCard({ module }: ModuleCardProps) {
  const cfg = STATUS_CONFIG[module.status];

  return (
    <div
      className={`
        relative rounded-xl border p-5 transition-all duration-200
        hover:translate-y-[-2px] hover:shadow-lg
        ${cfg.border} ${cfg.bg} ${cfg.glow}
        animate-fade-in
      `}
    >
      {/* Status dot indicator */}
      <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${cfg.dot}`} />

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-lg ${cfg.badgeBg} border ${cfg.badgeBorder} flex-shrink-0`}>
          {cfg.icon}
        </div>
        <div className="min-w-0">
          <p className="text-white/90 font-body font-medium text-sm leading-snug">
            {cfg.headline(module)}
          </p>
          <span className={`inline-flex items-center gap-1 mt-1 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5">
        <MetaItem
          icon={<CalendarIcon className="w-3.5 h-3.5" />}
          label="Último mantenimiento"
          value={formatDate(module.lastMaintenanceDate)}
        />
        <MetaItem
          icon={<CalendarIcon className="w-3.5 h-3.5" />}
          label="Próximo mantenimiento"
          value={formatDate(module.nextMaintenanceDate)}
        />
        <MetaItem
          label="Frecuencia"
          value={`Cada ${module.frequencyDays} días`}
        />
        <MetaItem
          label="Info"
          value={module.info}
        />
      </div>

      {/* Line tag */}
      <div className="mt-3">
        <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">
          {module.lineName} · {module.module}
        </span>
      </div>
    </div>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function MetaItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1 text-[10px] font-mono text-white/25 uppercase tracking-widest mb-0.5">
        {icon}
        {label}
      </p>
      <p className="text-xs text-white/60 font-body truncate">{value}</p>
    </div>
  );
}
