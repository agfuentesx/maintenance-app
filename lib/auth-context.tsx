"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { AuthState, UserRole } from "@/types";

// ─── Context Definition ───────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  loginAsVisitante: () => void;
  loginAsAdmin: (pin: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "maintenance_app_role";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    role: null,
    isAuthenticated: false,
  });

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY) as UserRole | null;
    if (stored === "admin" || stored === "visitante") {
      setAuth({ role: stored, isAuthenticated: true });
    }
  }, []);

  const loginAsVisitante = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "visitante");
    setAuth({ role: "visitante", isAuthenticated: true });
  }, []);

  const loginAsAdmin = useCallback((pin: string): boolean => {
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN ?? "";
    if (pin === correctPin) {
      sessionStorage.setItem(SESSION_KEY, "admin");
      setAuth({ role: "admin", isAuthenticated: true });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuth({ role: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, loginAsVisitante, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
