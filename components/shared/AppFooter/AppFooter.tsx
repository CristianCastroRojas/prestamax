export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background px-4 py-3">
      <p className="text-center text-xs text-muted-foreground">
        © {currentYear} PrestaMax · Desarrollado por{" "}
        <span className="font-medium">Cristian Castro</span>
      </p>
    </footer>
  );
}
