import { SignIn } from "@clerk/nextjs";
import { LandmarkIcon } from "lucide-react";
import type { Metadata } from "next";
import { clerkAppearanceSignIn } from "@/lib/auth/clerk-appearance";

export const metadata: Metadata = {
  title: "Iniciar sesión | PrestaMax",
  description: "Plataforma moderna para la gestión y control de préstamos.",
};

export default function SignInPage() {
  return (
    <section className="flex w-full flex-col items-center px-4 py-8 sm:py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        {/* Logo / Icon */}
        <LandmarkIcon
          className="h-12 w-12 text-primary sm:h-14 sm:w-14"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Bienvenido a <span className="text-primary">PrestaMax</span>
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            La plataforma moderna para gestionar clientes, pagos e intereses.
          </p>
        </div>

        {/* Clerk SignIn */}
        <SignIn appearance={clerkAppearanceSignIn} />
      </div>
    </section>
  );
}
