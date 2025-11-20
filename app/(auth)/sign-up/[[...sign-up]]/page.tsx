import { SignUp } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { LandmarkIcon } from "lucide-react";
import { Metadata } from "next";
import { FooterAuth } from "../../components";

export const metadata: Metadata = {
  title: "Crear cuenta | PrestaMax",
  description:
    "Crea tu cuenta en PrestaMax, la plataforma moderna para administrar clientes, pagos, intereses y reportes con eficiencia.",
  authors: [{ name: "Cristian Andres Castro Rojas" }],
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-white to-blue-50">
      {/* Contenido principal */}
      <div className="flex flex-col flex-1 items-center justify-center px-4 py-10 gap-8 w-full">
        {/* Logo */}
        <LandmarkIcon className="w-14 h-auto text-blue-600" />

        {/* Título y descripción */}
        <div className="text-center space-y-3 max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Crea tu cuenta en <span className="text-blue-600">PrestaMax</span>
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Regístrate para acceder a tus herramientas de gestión,
            administración y control financiero.
          </p>
        </div>

        {/* Formulario Clerk */}
        <SignUp
          appearance={{
            theme: shadcn,
            elements: {
              card: "shadow-xl border rounded-xl bg-white w-full",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white border-none transition",
              headerTitle: "text-neutral-900",
              headerSubtitle: "text-neutral-600",
            },
          }}
        />
      </div>

      {/* Footer */}
      <FooterAuth />
    </div>
  );
}
