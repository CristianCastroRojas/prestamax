/**
 * Realiza la petición HTTP DELETE para eliminar un cliente específico.
 * @param clientId ID único del cliente a eliminar.
 * @returns Una promesa que se resuelve si la operación fue exitosa.
 */
export async function deleteCliente(clientId: number): Promise<void> {
  const response = await fetch(`/api/clientes/${clientId}`, {
    method: "DELETE",
  });

  let data: any = null;

  // Intentamos parsear el JSON solo si hay contenido en la respuesta
  // para evitar errores de sintaxis en el cliente si el backend responde con un 204 (No Content).
  try {
    data = await response.json();
  } catch (err) {
    // Si falla el parseo, el backend probablemente envió un body vacío o no es JSON
  }

  // Si la respuesta no es exitosa (fuera del rango 200-299)
  if (!response.ok) {
    throw new Error(data?.error || "Error al eliminar el cliente");
  }
}
