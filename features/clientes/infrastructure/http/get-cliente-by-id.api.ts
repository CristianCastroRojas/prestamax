import "server-only";

import { GetByIdClienteDTO } from "@/features/clientes/application/dtos/get-cliente-by-id.dto";
import { ClienteService } from "@/features/clientes/application/use-cases";

/**
 * Función de servidor para obtener un cliente por ID.
 * Se usa en Server Components (como la página de edición o detalle)
 * para obtener datos directamente de la base de datos.
 */
export async function getClienteById(
  id: number,
): Promise<GetByIdClienteDTO | null> {
  try {
    // 1. Invocación directa a la lógica de negocio (Application Layer)
    // Esto es mucho más rápido que un fetch() a la ruta /api/clientes/[id]
    const cliente = await ClienteService.findOne(id);

    if (!cliente) return null;

    // 2. Retorno de los datos tipados para el componente
    return cliente as GetByIdClienteDTO;
  } catch (error) {
    // Registro del error en los logs del servidor
    console.error("Error al obtener cliente directamente del servicio:", error);

    // Retornamos null para que el componente de UI pueda manejar el estado vacío o llamar a notFound()
    return null;
  }
}
