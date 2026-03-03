import { UbicacionRepository } from "../../infrastructure/repositories/ubicacion.repository";
import { DatabaseError } from "@/features/shared/domain/errors";

/**
 * Caso de Uso: Obtener el mapa completo de ubicaciones.
 * Recupera departamentos y ciudades en una sola operación asíncrona paralela.
 */
export const GetUbicacionesUseCase = {
  async execute() {
    try {
      // Ejecución en paralelo: ganancia de performance crítica
      const [departamentos, ciudades] = await Promise.all([
        UbicacionRepository.getDepartamentos(),
        UbicacionRepository.getCiudades(),
      ]);

      return { departamentos, ciudades };
    } catch (error: unknown) {
      // Centralización del error técnico en un error de dominio
      throw new DatabaseError(
        "No se pudo cargar la información de ubicaciones.",
      );
    }
  },
};
