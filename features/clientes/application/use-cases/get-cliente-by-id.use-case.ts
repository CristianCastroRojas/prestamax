import { NotFoundError } from "@/features/shared/domain/errors";
import { ClienteRepository } from "../../infrastructure/repositories/cliente.repository";
import { GetByIdClienteDTO } from "../dtos/get-cliente-by-id.dto";

/**
 * Caso de Uso: Obtener un cliente por su identificador único.
 * Utilizado principalmente para la página de perfil detallado
 * y para precargar datos en formularios de edición.
 */
export const GetByIdClienteUseCase = {
  async execute(id: number): Promise<GetByIdClienteDTO> {
    // 1. Consulta al repositorio buscando el registro específico
    const cliente = await ClienteRepository.getById(id);

    // 2. Validación de existencia
    if (!cliente) {
      // Si el ID no existe en la BD, lanzamos un error de dominio 404
      throw new NotFoundError("Cliente", id);
    }

    // 3. Retorno del DTO mapeado con toda la información necesaria
    return cliente;
  },
};
