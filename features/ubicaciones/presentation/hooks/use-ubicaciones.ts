import { useQuery } from "@tanstack/react-query";

import {
  CiudadDTO,
  DepartamentoDTO,
} from "@/features/ubicaciones/application/dtos/ubicacion.dto";

import { DatabaseError } from "@/features/shared/domain/errors";

interface UbicacionesResponse {
  departamentos: DepartamentoDTO[];
  ciudades: CiudadDTO[];
}

export function useUbicaciones() {
  return useQuery<UbicacionesResponse>({
    queryKey: ["ubicaciones"],
    queryFn: async () => {
      const response = await fetch("/api/ubicaciones");
      if (!response.ok) {
        throw new DatabaseError(
          "Error al obtener las ubicaciones desde el servidor",
        );
      }
      return response.json();
    },
    // Datos estáticos
    staleTime: 1000 * 60 * 60 * 24,
  });
}
