"use client";

import { useState, useCallback } from "react";
import type { EnrichedModule } from "@/types";
import { enrichModules } from "@/lib/maintenance";
import type { ModulesApiResponse } from "@/types";

interface UseModulesReturn {
  modules: EnrichedModule[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useModules(): UseModulesReturn {
  const [modules, setModules] = useState<EnrichedModule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = process.env.NEXT_PUBLIC_MODULES_ENDPOINT;
      if (!endpoint) throw new Error("MODULES_ENDPOINT no configurado.");

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const data: ModulesApiResponse = await res.json();
      const today = new Date();
      const enriched = enrichModules(data, today);

      setModules(enriched);
      setLastUpdated(today);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error desconocido al cargar datos."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { modules, isLoading, error, lastUpdated, refresh };
}
