// features/clientes/Services/UpdateClienteService.ts
import { UpdateClienteDTO } from "../dtos/UpdateClienteDTO";
import { ClienteRepository } from "../repository/ClienteRepository";

export const UpdateClienteService = {
  /**
   * Actualiza la información de un cliente existente
   */
  async execute(data: UpdateClienteDTO) {
    try {
      // 1. Verificación de existencia
      const clienteExistente = await ClienteRepository.getById(data.id);

      if (!clienteExistente) {
        throw new Error(
          `El cliente con ID ${data.id} no existe en la base de datos.`,
        );
      }

      // 2. Ejecución de la actualización (el Repositorio valida duplicados de correo/doc)
      const clienteActualizado = await ClienteRepository.update(data);

      return {
        success: true,
        data: clienteActualizado,
        message: "Datos del cliente actualizados correctamente",
      };
    } catch (error: unknown) {
      console.error("[UpdateClienteService Error]:", error);

      // Extraemos el mensaje de error de forma segura
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al intentar actualizar los datos del cliente";

      // Lanzamos el error para que la API Route lo capture
      throw new Error(errorMessage);
    }
  },
};
