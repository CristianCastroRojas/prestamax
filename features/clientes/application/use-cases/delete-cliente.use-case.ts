import { NotFoundError } from "@/features/shared/domain/errors";
import { ClienteRepository } from "../../infrastructure/repositories/cliente.repository";

/**
 * Caso de Uso: Eliminación de cliente.
 * Se encarga de verificar la existencia del registro antes de proceder
 * con el borrado físico o lógico en la base de datos.
 */
export const DeleteClienteUseCase = {
  async execute(id: number) {
    // 1. Validar existencia: Recuperamos el cliente para confirmar que existe
    // y para obtener su nombre para el mensaje de confirmación.
    const cliente = await ClienteRepository.getById(id);

    if (!cliente) {
      // Lanzamos un error estandarizado que la API convertirá en un 404
      throw new NotFoundError("Cliente", id);
    }

    // 2. Ejecutar eliminación a través del repositorio
    await ClienteRepository.delete(id);

    // 3. Respuesta detallada de éxito
    return {
      success: true,
      data: { id_eliminado: id },
      message: `El cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado correctamente.`,
    };
  },
};
