import { LucideIcon, Users } from "lucide-react";

export interface SidebarRoute {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SIDEBAR_ROUTES: SidebarRoute[] = [
  {
    label: "Gestión de Clientes",
    href: "/clientes",
    icon: Users,
  },
];
