import type { EnrichedModule } from "@/types";

interface DashboardSummaryProps {
  modules: EnrichedModule[];
}

export function DashboardSummary({ modules }: DashboardSummaryProps) {
  const total    = modules.length;
  const ok       = modules.filter((m) => m.status === "ok").length;
  const dueSoon  = modules.filter((m) => m.status === "due-soon").length;
  const overdue  = modules.filter((m) => m.status === "overdue").length;

  const stats = [
    { label: "Total módulos",       value: total,   color: "text-white/70",    bar: "bg-white/20" },
    { label: "En buen estado",      value: ok,      color: "text-emerald-400", bar: "bg-emerald-500" },
    { label: "Req. mantenimiento",  value: dueSoon, color: "text-amber-400",   bar: "bg-amber-500" },
    { label: "Mantenimiento vencido", value: overdue, color: "text-red-400",   bar: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white/3 border border-white/5 rounded-xl p-4 flex flex-col gap-2"
        >
          <span className={`text-2xl font-display font-bold ${s.color}`}>
            {s.value}
          </span>
          <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest leading-tight">
            {s.label}
          </p>
          <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full ${s.bar} rounded-full transition-all duration-500`}
              style={{ width: total ? `${(s.value / total) * 100}%` : "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
