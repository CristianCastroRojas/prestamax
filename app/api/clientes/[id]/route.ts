import { NextResponse } from "next/server";

import { handleApiError } from "@/features/shared/infrastructure/errors/handle-api-error";
import { updateClienteSchema } from "@/features/clientes";
import { ClienteService } from "@/features/clientes/application/use-cases";

/**
 * GET: Obtiene un cliente específico por su ID.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const clienteId = parseInt(id);

    // Validación básica del parámetro de ruta
    if (isNaN(clienteId)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    const resultado = await ClienteService.findOne(clienteId);
    return NextResponse.json(resultado, { status: 200 });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

/**
 * PATCH: Actualiza parcialmente los datos de un cliente.
 * Combina el ID de la URL con el cuerpo validado por el esquema de Zod.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const clienteId = parseInt(id);

    if (isNaN(clienteId)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    const body = await req.json();

    // Validación de esquema para actualización (campos opcionales)
    const validatedData = updateClienteSchema.parse(body);

    const resultado = await ClienteService.update({
      ...validatedData,
      id: clienteId,
    });

    return NextResponse.json(resultado, { status: 200 });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

/**
 * DELETE: Elimina un cliente del sistema.
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const clienteId = parseInt(id);

    // En DELETE la validación del ID suele ser implícita en el servicio,
    // pero se mantiene la estructura para consistencia.
    const resultado = await ClienteService.remove(clienteId);

    return NextResponse.json(resultado, { status: 200 });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
