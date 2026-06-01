import type {
  RawModule,
  RawLine,
  ModulesApiResponse,
  EnrichedModule,
  MaintenanceStatus,
} from "@/types";

// ─── Date Parsing ─────────────────────────────────────────────────────────────

export function parseDDMMYYYY(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ─── Status Computation ───────────────────────────────────────────────────────

export function computeMaintenanceStatus(
  lastDate: Date,
  frequencyDays: number,
  today: Date
): { status: MaintenanceStatus; nextDate: Date } {
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + frequencyDays);

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntilDue = Math.floor(
    (nextDate.getTime() - today.getTime()) / msPerDay
  );

  let status: MaintenanceStatus;

  if (daysUntilDue < 0) {
    // Past due date
    status = "overdue";
  } else if (daysUntilDue <= 3) {
    // Within one frequency window → due soon
    status = "due-soon";
  } else {
    status = "ok";
  }

  return { status, nextDate };
}

// ─── Line Key Formatter ───────────────────────────────────────────────────────

export function formatLineLabel(lineKey: string): string {
  const num = lineKey.replace("line_", "");
  return `Línea ${num}`;
}

// ─── API Response Enrichment ──────────────────────────────────────────────────

export function enrichModules(
  data: ModulesApiResponse,
  today: Date = new Date()
): EnrichedModule[] {
  const enriched: EnrichedModule[] = [];

  for (const lineObj of data.lines) {
    const lineKey = Object.keys(lineObj)[0];
    const modules: RawModule[] = (lineObj as RawLine)[lineKey] ?? [];

    for (const raw of modules) {
      const lastDate = parseDDMMYYYY(raw.date);
      const frequency = parseInt(raw.frecuency, 10);
      const { status, nextDate } = computeMaintenanceStatus(
        lastDate,
        frequency,
        today
      );

      enriched.push({
        id: `${lineKey}::${raw.module}`,
        module: raw.module,
        lineName: formatLineLabel(lineKey),
        lineKey,
        lastMaintenanceDate: lastDate,
        nextMaintenanceDate: nextDate,
        frequencyDays: frequency,
        status,
        info: raw.info,
      });
    }
  }

  return enriched;
}
