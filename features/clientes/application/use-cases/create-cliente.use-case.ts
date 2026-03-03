import { ConflictError } from "@/features/shared/domain/errors";
import { ClienteRepository } from "../../infrastructure/repositories/cliente.repository";
import { CreateClienteDTO } from "../dtos/create-cliente.dto";

/**
 * Caso de Uso: Registro de nuevo cliente.
 * Encargado de orquestar las validaciones de unicidad y la persistencia de datos.
 */
export const CreateClienteUseCase = {
  async execute(data: CreateClienteDTO) {
    // 1. Validación de Unicidad: Número de Documento
    const docExiste = await ClienteRepository.findByDocumento(
      data.numero_documento,
    );
    if (docExiste) {
      throw new ConflictError("El número de documento ya está registrado.");
    }

    // 2. Validación de Unicidad: Correo Electrónico (si se proporciona)
    if (data.correo) {
      const correoExiste = await ClienteRepository.findByCorreo(data.correo);
      if (correoExiste) {
        throw new ConflictError("El correo electrónico ya está registrado.");
      }
    }

    // 3. Persistencia de datos a través del repositorio
    const cliente = await ClienteRepository.create(data);

    // 4. Respuesta estandarizada de éxito
    return {
      success: true,
      data: cliente,
      message: "Cliente registrado exitosamente en el sistema",
    };
  },
};
