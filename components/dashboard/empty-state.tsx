import { RefreshIcon } from "@/components/ui/icons";

interface EmptyStateProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

export function EmptyState({ onRefresh, isLoading }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center mb-4">
        <RefreshIcon className="w-6 h-6 text-white/20" />
      </div>
      <p className="text-white/40 font-body text-sm mb-1">No hay módulos cargados</p>
      <p className="text-white/20 font-mono text-xs mb-6">
        Presiona actualizar para cargar los datos
      </p>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-body hover:bg-brand-500/20 transition-all disabled:opacity-50"
      >
        <RefreshIcon className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        {isLoading ? "Cargando..." : "Actualizar"}
      </button>
    </div>
  );
}
