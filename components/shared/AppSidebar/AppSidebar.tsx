"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ROUTES } from "@/config/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarHeader className="mt-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo_prestamax.png"
              alt="Prestamax"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold">Prestamax</span>
          </Link>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel>Menú principal</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR_ROUTES.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    aria-current={isActive ? "page" : undefined}
                    title={item.label}
                    className={cn(
                      "transition-colors rounded-md",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
