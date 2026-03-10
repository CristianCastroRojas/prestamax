import { useQuery } from "@tanstack/react-query";
import { TipoDocumentoDTO } from "@/features/tipos-documentos/application/dtos/tipo-documento.dto";
import { DatabaseError } from "@/features/shared/domain/errors";

export function useTiposDocumentos() {
  return useQuery<TipoDocumentoDTO[]>({
    queryKey: ["tipos-documentos"],
    queryFn: async () => {
      const response = await fetch("/api/tipos-documentos");
      if (!response.ok) {
        throw new DatabaseError(
          "Error al obtener los tipos de documentos desde el servidor",
        );
      }
      return response.json();
    },
    // Datos estáticos, refrescar cada 24 horas o al recargar manualmente
    staleTime: 1000 * 60 * 60 * 24,
  });
}
