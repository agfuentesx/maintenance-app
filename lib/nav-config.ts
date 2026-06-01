import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    adminOnly: false,
  },
  {
    label: "Formulario",
    href: "/form",
    icon: "form",
    adminOnly: true,
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: "profile",
    adminOnly: false,
  },
];
