import { CreateClienteInput } from "../validation/create-cliente.schema";

/**
 * Estructura de respuesta estándar para la creación de registros.
 * Incluye soporte para mensajes de éxito y detalles de errores de validación.
 */
interface CreateClienteResponse {
  message?: string;
  error?: string;
  issues?: { campo: string; mensaje: string }[];
}

/**
 * Función encargada de realizar la petición HTTP POST para crear un cliente.
 * Se utiliza principalmente en el hook de mutación o en el formulario.
 */
export async function createCliente(
  data: CreateClienteInput,
): Promise<CreateClienteResponse> {
  const response = await fetch(`/api/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: CreateClienteResponse = await response.json();

  // Gestión de errores basada en el estado de la respuesta HTTP
  if (!response.ok) {
    const error = new Error(
      result.error || "Error inesperado al crear el cliente",
    );

    // Adjuntamos información adicional para que el componente UI pueda reaccionar
    // @ts-expect-error - Extensión manual de la clase Error
    error.status = response.status;
    // @ts-expect-error - Mapeo de errores de validación (Zod/Backend)
    error.issues = result.issues;

    throw error;
  }

  return result;
}
