import { AppFooter, AppNavbar, AppSidebar } from "@/components/shared";

export default function RoutesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh w-full">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:block">
        <AppSidebar />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col bg-[#F6F7F8]">
        {/* Top navbar */}
        <AppNavbar />

        {/* Page content */}
        <main className="flex-1 w-full px-4 py-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <AppFooter />
      </div>
    </div>
  );
}
