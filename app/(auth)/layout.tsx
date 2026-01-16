import { FooterAuth } from "@/features/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white overflow-x-hidden">
      <main className="flex flex-1 items-center justify-center px-4">
        <section className="w-full max-w-md">{children}</section>
      </main>

      <FooterAuth />
    </div>
  );
}
