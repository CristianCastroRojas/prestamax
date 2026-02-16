import { GetByIdClienteDTO } from "@/features/clientes/dtos/GetByIdClienteDTO";

export async function getClienteById(
  id: number,
): Promise<GetByIdClienteDTO | null> {
  try {
    const response = await fetch(`/api/clientes/${id}`, {
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
