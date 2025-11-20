export function FooterAuth() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-center text-xs text-neutral-500 border-t border-neutral-200/60">
      © {currentYear} PrestaMax — Desarrollado por Cristian Castro | Todos los
      derechos reservados.
    </footer>
  );
}
