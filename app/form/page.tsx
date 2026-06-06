"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, useMobileMenu } from "@/components/layout/app-shell";
import { TopBar } from "@/components/layout/top-bar";

function FormContent() {
  const toggleMenu = useMobileMenu();
  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

  return (
    <>
      <TopBar onMenuToggle={toggleMenu} />
      <div className="p-4 md:p-6 h-[calc(100vh-3.5rem)] flex flex-col">
        <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-4">
          Registro de mantenimiento
        </p>

        {formUrl ? (
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/8 bg-white/3 shadow-2xl">
            <iframe
              src={formUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full h-full min-h-[600px]"
              title="Formulario de mantenimiento"
            >
              Cargando formulario…
            </iframe>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/3 text-center px-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <span className="text-amber-400 text-xl">⚙</span>
            </div>
            <p className="text-white/50 font-body text-sm mb-1">
              URL del formulario no configurada
            </p>
            <p className="text-white/20 font-mono text-xs">
              Configura <code className="bg-white/5 px-1 rounded">NEXT_PUBLIC_GOOGLE_FORM_URL</code> en <code className="bg-white/5 px-1 rounded">.env.local</code>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function FormPage() {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    } else if (role !== "admin") {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, role, router]);

  if (!isAuthenticated || role !== "admin") return null;

  return (
    <AppShell>
      <FormContent />
    </AppShell>
  );
}
