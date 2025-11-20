import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";
import "./globals.css";
import { shadcn } from "@clerk/themes";
import { esES } from "@clerk/localizations";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
      localization={esES}
    >
      <html lang="es">
        <body
          className={`${nunito.className} antialiased`}
          cz-shortcut-listen="true"
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
