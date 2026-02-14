// src/data/cliente/createCliente.ts

import { API_URL } from "@/config/api";
import { CreateClienteInput } from "../schemas/create-cliente.schema";

interface CreateClienteResponse {
  message?: string;
  error?: string;
  issues?: { campo: string; mensaje: string }[];
}

export async function createCliente(
  data: CreateClienteInput,
): Promise<CreateClienteResponse> {
  const response = await fetch(`${API_URL}/api/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: CreateClienteResponse = await response.json();

  if (!response.ok) {
    const error = new Error(result.error || "Error inesperado");
    // @ts-expect-error – adjuntamos info útil al error
    error.status = response.status;
    // @ts-expect-error
    error.issues = result.issues;
    throw error;
  }

  return result;
}
