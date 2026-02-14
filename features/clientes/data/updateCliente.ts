// src/data/cliente/updateCliente.ts

import { API_URL } from "@/config/api";
import { UpdateClienteInput } from "../schemas/update-cliente.schema";

interface UpdateClienteResponse {
  message?: string;
  error?: string;
  issues?: { campo: string; mensaje: string }[];
}

export async function updateCliente(
  id: number,
  data: UpdateClienteInput,
): Promise<UpdateClienteResponse> {
  // En Windows/Next.js, asegúrate de que la URL no tenga doble slash por error
  const response = await fetch(`${API_URL}/api/clientes/${id}`, {
    method: "PATCH", // Usamos PATCH para actualizaciones parciales
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: UpdateClienteResponse = await response.json();

  if (!response.ok) {
    const error = new Error(result.error || "Error al actualizar el cliente");

    // Mantenemos tu lógica de adjuntar info útil al error para el formulario
    // @ts-expect-error – adjuntamos info útil al error
    error.status = response.status;
    // @ts-expect-error
    error.issues = result.issues;

    throw error;
  }

  return result;
}
