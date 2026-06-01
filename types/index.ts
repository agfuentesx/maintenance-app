// ─── Module & API Types ───────────────────────────────────────────────────────

export interface RawModule {
  module: string;
  date: string; // "DD/MM/YYYY"
  frecuency: string; // numeric string
  info: string;
}

export interface RawLine {
  [lineKey: string]: RawModule[];
}

export interface ModulesApiResponse {
  lines: RawLine[];
}

// ─── Computed/Enriched Module ─────────────────────────────────────────────────

export type MaintenanceStatus = "ok" | "due-soon" | "overdue";

export interface EnrichedModule {
  id: string; // "line_1::M02-A"
  module: string;
  lineName: string; // "Línea 1"
  lineKey: string; // "line_1"
  lastMaintenanceDate: Date;
  nextMaintenanceDate: Date;
  frequencyDays: number;
  status: MaintenanceStatus;
  info: string;
}

// ─── Auth Types ───────────────────────────────────────────────────────────────

export type UserRole = "admin" | "visitante";

export interface AuthState {
  role: UserRole | null;
  isAuthenticated: boolean;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  adminOnly: boolean;
}
