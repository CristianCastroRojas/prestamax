import { DatabaseError } from "@/features/shared/domain/errors";
import { ClienteRepository } from "../../infrastructure/repositories/cliente.repository";
import { GetAllClienteDTO } from "../dtos/get-all-clientes.dto";
import { PaginatedResponseDTO } from "../dtos/paginated-response.dto";

/**
 * Caso de Uso: Obtener listado paginado de clientes.
 * Transforma los datos crudos del repositorio en una respuesta
 * estructurada con metadatos de navegación.
 */
export const GetAllClienteUseCase = {
  async execute(
    page: number,
    limit: number,
  ): Promise<PaginatedResponseDTO<GetAllClienteDTO>> {
    try {
      // 1. Recuperación de datos y conteo total desde la infraestructura
      const { data, total } = await ClienteRepository.getAll(page, limit);

      // 2. Construcción de la respuesta paginada estandarizada
      return {
        data,
        meta: {
          total,
          page,
          limit,
          // Cálculo lógico de la última página disponible
          lastPage: Math.ceil(total / limit) || 1,
        },
      };
    } catch (error: unknown) {
      // Encapsulamiento de errores de base de datos con mensajes amigables
      throw new DatabaseError("No se pudo obtener el listado de clientes.");
    }
  },
};
