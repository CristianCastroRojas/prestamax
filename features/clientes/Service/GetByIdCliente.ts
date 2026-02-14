import { GetByIdClienteDTO } from "../dtos/GetByIdClienteDTO";
import { ClienteRepository } from "../repository/ClienteRepository";

export const GetByIdClienteService = {
  async execute(id: number): Promise<GetByIdClienteDTO> {
    try {
      const cliente = await ClienteRepository.getById(id);
      if (!cliente) {
        throw new Error(`Cliente con ID ${id} no encontrado`);
      }
      return cliente;
    } catch (error: unknown) {
      console.error("[GetByIdClienteService Error]:", error);
      // Extraemos el mensaje de error validando el tipo unknown
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error inesperado al obtener el cliente";

      throw new Error(errorMessage);
    }
  },
};
