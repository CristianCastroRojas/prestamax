import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export function AppNavbar() {
  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b bg-background">
      <nav className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-2">
          {/* Sidebar trigger: útil en mobile/tablet */}
          <SidebarTrigger
            aria-label="Alternar menú lateral"
            className="h-9 w-9"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
