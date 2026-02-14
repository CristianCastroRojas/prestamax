import { ClienteRepository } from "../repository/ClienteRepository";

export const DeleteClienteService = {
  async execute(id: number) {
    try {
      // 1. Validar existencia
      const cliente = await ClienteRepository.getById(id);

      if (!cliente) {
        throw new Error(`El cliente con ID ${id} no existe.`);
      }

      // 2. Ejecutar eliminación
      await ClienteRepository.delete(id);

      return {
        success: true,
        data: { id_eliminado: id },
        message: `El cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado correctamente.`,
      };
    } catch (error: unknown) {
      console.error("[DeleteClienteService Error]:", error);

      // Extraemos el mensaje sin añadir prefijos para mantenerlo limpio
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error inesperado al eliminar el cliente";

      throw new Error(errorMessage);
    }
  },
};
