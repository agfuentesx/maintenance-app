"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, useMobileMenu } from "@/components/layout/app-shell";
import { TopBar } from "@/components/layout/top-bar";
import { ShieldIcon, ProfileIcon, LogoutIcon } from "@/components/ui/icons";

function ProfileContent() {
  const toggleMenu = useMobileMenu();
  const { role, logout } = useAuth();

  const isAdmin = role === "admin";

  return (
    <>
      <TopBar title="Perfil" onMenuToggle={toggleMenu} />
      <div className="p-4 md:p-6 max-w-lg">
        {/* Avatar / role card */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-4 flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            isAdmin
              ? "bg-brand-500/15 border border-brand-500/25"
              : "bg-white/5 border border-white/10"
          }`}>
            {isAdmin
              ? <ShieldIcon className="w-7 h-7 text-brand-400" />
              : <ProfileIcon className="w-7 h-7 text-white/40" />
            }
          </div>
          <div>
            <p className="text-white font-body font-medium">
              {isAdmin ? "Administrador" : "Visitante"}
            </p>
            <p className="text-white/30 font-mono text-xs uppercase tracking-widest mt-0.5">
              {isAdmin ? "Acceso completo al sistema" : "Acceso de solo lectura"}
            </p>
          </div>
        </div>

        {/* Permissions list */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-4">
          <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest mb-4">
            Permisos
          </p>
          <div className="space-y-3">
            <PermissionRow label="Ver Dashboard"        granted={true} />
            <PermissionRow label="Ver Perfil"           granted={true} />
            <PermissionRow label="Acceder al Formulario" granted={isAdmin} />
            <PermissionRow label="Gestión de módulos"   granted={isAdmin} />
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white/50 hover:text-white/80 hover:bg-white/6 text-sm font-body transition-all"
        >
          <LogoutIcon className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </>
  );
}

function PermissionRow({ label, granted }: { label: string; granted: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-body text-white/60">{label}</span>
      <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
        granted
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : "bg-white/3 text-white/20 border-white/8"
      }`}>
        {granted ? "Permitido" : "Restringido"}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <AppShell>
      <ProfileContent />
    </AppShell>
  );
}
