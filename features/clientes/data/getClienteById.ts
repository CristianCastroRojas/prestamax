import { API_URL } from "@/config/api";
import { GetByIdClienteDTO } from "@/features/clientes/DTOs/GetByIdClienteDTO";

export async function getClienteById(
  id: number,
): Promise<GetByIdClienteDTO | null> {
  try {
    const response = await fetch(`${API_URL}/api/clientes/${id}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    return null;
  }
}
