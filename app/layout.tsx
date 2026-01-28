import "./globals.css";

// Librerías externas
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { shadcn } from "@clerk/themes";

// Next.js
import type { Metadata } from "next";
import { cookies } from "next/headers";

// Fonts
import { Nunito } from "next/font/google";

// Componentes internos
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrestaMax | Gestión y Administración de Préstamos",
  description:
    "PrestaMax es una plataforma moderna para la gestión, administración y control de préstamos. Organiza clientes, pagos, intereses y reportes de forma eficiente.",
  authors: [{ name: "Cristian Andres Castro Rojas" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <ClerkProvider
      appearance={{ theme: shadcn }}
      localization={esES}
    >
      <html lang="es">
        <body
          className={`${nunito.className} antialiased`}
          cz-shortcut-listen="true"
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <main className="flex-1">{children}</main>
          </SidebarProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
