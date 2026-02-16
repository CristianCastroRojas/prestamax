export async function deleteCliente(clientId: number): Promise<void> {
  const response = await fetch(`/api/clientes/${clientId}`, {
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
