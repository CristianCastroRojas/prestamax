import { API_URL } from "@/config/api";

export async function deleteCliente(clientId: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/clientes/${clientId}`, {
    method: "DELETE",
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    // backend sin body
  }

  if (!response.ok) {
    throw new Error(data?.error || "Error al eliminar el cliente");
  }
}
