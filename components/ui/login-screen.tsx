"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { ShieldIcon, ProfileIcon } from "@/components/ui/icons";

export function LoginScreen() {
  const { loginAsAdmin, loginAsVisitante } = useAuth();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [showPin, setShowPin] = useState(false);

  function handleAdminLogin() {
    const ok = loginAsAdmin(pin);
    if (!ok) {
      setError("PIN incorrecto. Intente de nuevo.");
      setPin("");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleAdminLogin();
  }

  return (
    <div className="min-h-screen bg-slate-975 flex items-center justify-center px-4">
      {/* Background grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-sm animate-fade-in">
        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center shadow-xl shadow-brand-500/30 mb-4">
            <ShieldIcon className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-white text-2xl">Sistema de Mantenimiento</h1>
          <p className="text-white/30 font-mono text-xs mt-1 uppercase tracking-widest">
            Selecciona tu perfil
          </p>
        </div>

        <div className="space-y-3">
          {/* Visitor card */}
          <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/8">
                <ProfileIcon className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <p className="text-white/80 font-body font-medium text-sm">Visitante</p>
                <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
                  Dashboard y perfil
                </p>
              </div>
            </div>
            <button
              onClick={loginAsVisitante}
              className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-white/70 hover:text-white text-sm font-body transition-all"
            >
              Entrar como Visitante
            </button>
          </div>

          {/* Admin card */}
          <div className="bg-brand-500/5 border border-brand-500/15 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
                <ShieldIcon className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <p className="text-white/80 font-body font-medium text-sm">Administrador</p>
                <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
                  Acceso completo · requiere PIN
                </p>
              </div>
            </div>

            <div className="flex gap-2 mb-2">
              <div className="relative flex-1">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ingresa tu PIN"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-brand-500/50 focus:bg-brand-500/5 transition-all"
                />
                <button
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 text-xs font-mono"
                >
                  {showPin ? "Ocultar" : "Ver"}
                </button>
              </div>
              <button
                onClick={handleAdminLogin}
                disabled={!pin}
                className="px-4 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-white text-sm font-body transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20"
              >
                Entrar
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs font-mono mt-1">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
