import { SignUp } from "@clerk/nextjs";
import { LandmarkIcon } from "lucide-react";
import type { Metadata } from "next";
import { clerkAppearanceSignUp } from "@/lib/auth/ClerkAppearance";

export const metadata: Metadata = {
  title: "Crear cuenta | PrestaMax",
  description:
    "Crea tu cuenta en PrestaMax y accede a tus herramientas de gestión financiera.",
};

export default function SignUpPage() {
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
            Crea tu cuenta en <span className="text-primary">PrestaMax</span>
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Regístrate para acceder a tus herramientas de gestión y control
            financiero.
          </p>
        </div>

        {/* Clerk SignUp */}
        <SignUp appearance={clerkAppearanceSignUp} />
      </div>
    </section>
  );
}
