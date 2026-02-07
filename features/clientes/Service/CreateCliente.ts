// features/clientes/services/CreateClienteService.ts
import { CreateClienteDTO } from "../DTOs/CreateClienteDTO";
import { ClienteRepository } from "../Repository/ClienteRepository";

export const CreateClienteService = {
  /**
   * Procesa el registro de un nuevo cliente
   */
  async execute(data: CreateClienteDTO) {
    try {
      const clienteCreado = await ClienteRepository.create(data);
      
      return {
        success: true,
        data: clienteCreado,
        message: "Cliente registrado exitosamente en el sistema"
      };
    } catch (error: unknown) {
      console.error("[CreateClienteService Error]:", error);
      
      // Extraemos el mensaje de error validando el tipo unknown
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Error inesperado al registrar el cliente";

      throw new Error(errorMessage);
    }
  }
};