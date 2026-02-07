export const formatDate = (date?: string | Date) => {
  if (!date) return "No registrada";
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const formatDateTime = (date?: string | Date) => {
  if (!date) return "No disponible";
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
