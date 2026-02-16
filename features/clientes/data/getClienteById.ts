// features/clientes/data/getClienteById.ts
import "server-only"; // Esto asegura que este código nunca se filtre al navegador
import { GetByIdClienteDTO } from "@/features/clientes/dtos/GetByIdClienteDTO";
import { ClienteService } from "@/features/clientes/service"; // Importa tu servicio

export async function getClienteById(
  id: number,
): Promise<GetByIdClienteDTO | null> {
  try {
    // Llamamos directamente a la lógica de negocio (DB)
    // sin pasar por la capa HTTP de la API
    const cliente = await ClienteService.findOne(id);

    if (!cliente) return null;

    return cliente as GetByIdClienteDTO;
  } catch (error) {
    console.error("Error al obtener cliente directamente del servicio:", error);
    return null;
  }
}
