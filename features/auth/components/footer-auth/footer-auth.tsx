export function FooterAuth() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/60 px-4 py-4 text-center text-xs text-neutral-500">
      <p>
        © {currentYear}{" "}
        <span className="font-medium text-neutral-600">PrestaMax</span>
      </p>
      <p>
        Desarrollado por{" "}
        <span className="font-medium text-neutral-600">Cristian Castro</span> ·
        Todos los derechos reservados.
      </p>
    </footer>
  );
}
