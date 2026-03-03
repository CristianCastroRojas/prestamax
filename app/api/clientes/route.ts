import { NextRequest, NextResponse } from "next/server";

import { handleApiError } from "@/features/shared/infrastructure/errors/handle-api-error";
import { ClienteService } from "@/features/clientes/application/use-cases";
import { createClienteSchema } from "@/features/clientes/infrastructure/validation/create-cliente.schema";

/**
 * GET: Obtiene el listado paginado de clientes.
 * Soporta query params: ?page=1&limit=10
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Normalización de parámetros de paginación
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") ?? "10"));

    // Llamada al servicio de aplicación para obtener los datos
    const response = await ClienteService.findAll(page, limit);

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    // Centralización del manejo de errores (Zod, Database, etc.)
    return handleApiError(error);
  }
}

/**
 * POST: Crea un nuevo cliente.
 * Valida el cuerpo de la petición contra el esquema de Zod antes de procesar.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validación de esquema (lanza error si los datos son inválidos)
    const validatedData = createClienteSchema.parse(body);

    // 2. Ejecución de la lógica de negocio para persistencia
    const resultado = await ClienteService.create(validatedData);

    return NextResponse.json(resultado, { status: 201 });
  } catch (error: unknown) {
    // Si la validación falla, handleApiError devolverá un 400 con los detalles
    return handleApiError(error);
  }
}
