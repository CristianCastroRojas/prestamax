import { UpdateClienteInput } from "../validation/update-cliente.schema";

/**
 * Estructura de respuesta para la actualización.
 * Permite manejar mensajes de éxito o errores de validación específicos.
 */
interface UpdateClienteResponse {
  message?: string;
  error?: string;
  issues?: { campo: string; mensaje: string }[];
}

/**
 * Función para actualizar los datos de un cliente existente.
 * @param id Identificador único del cliente.
 * @param data Objeto con los campos a actualizar (validados por Zod).
 */
export async function updateCliente(
  id: number,
  data: UpdateClienteInput,
): Promise<UpdateClienteResponse> {
  const response = await fetch(`/api/clientes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: UpdateClienteResponse = await response.json();

  if (!response.ok) {
    const error = new Error(result.error || "Error al actualizar el cliente");

    // Adjuntamos metadatos al error para que el componente (Sheet/Form)
    // pueda mostrar los mensajes de validación en los inputs correctos.
    // @ts-expect-error – información necesaria para la lógica de formularios
    error.status = response.status;
    // @ts-expect-error
    error.issues = result.issues;

    throw error;
  }

  return result;
}
