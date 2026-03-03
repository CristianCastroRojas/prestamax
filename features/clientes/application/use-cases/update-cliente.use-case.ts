import { NotFoundError, ConflictError } from "@/features/shared/domain/errors";
import { ClienteRepository } from "../../infrastructure/repositories/cliente.repository";
import { UpdateClienteDTO } from "../dtos/update-cliente.dto";

/**
 * Caso de Uso: Actualización de datos de cliente.
 * Valida la existencia del registro y previene la duplicidad de
 * identificadores únicos (documento y correo) con otros clientes.
 */
export const UpdateClienteUseCase = {
  async execute(data: UpdateClienteDTO) {
    // 1. Verificar que el cliente existe antes de intentar actualizar
    const clienteActual = await ClienteRepository.getById(data.id);

    if (!clienteActual) {
      throw new NotFoundError("Cliente", data.id);
    }

    // 2. Validación de Documento: Si cambia, verificar que no lo tenga otro cliente
    if (data.numero_documento) {
      const docEnUso = await ClienteRepository.findByDocumento(
        data.numero_documento,
      );

      // Comprobamos que el documento exista y no pertenezca al mismo cliente actual
      if (docEnUso && docEnUso.id !== data.id) {
        throw new ConflictError(
          "El número de documento ya pertenece a otro cliente.",
        );
      }
    }

    // 3. Validación de Correo: Si cambia, verificar disponibilidad
    if (data.correo) {
      const correoEnUso = await ClienteRepository.findByCorreo(data.correo);

      if (correoEnUso && correoEnUso.id !== data.id) {
        throw new ConflictError("El correo ya pertenece a otro cliente.");
      }
    }

    // 4. Persistencia de los cambios parciales
    const clienteActualizado = await ClienteRepository.update(data);

    // 5. Respuesta estandarizada con mensaje de feedback
    return {
      success: true,
      data: clienteActualizado,
      message: "Datos del cliente actualizados correctamente",
    };
  },
};
