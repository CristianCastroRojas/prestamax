import { NextRequest, NextResponse } from "next/server";
// Tu archivo de fachada
import { createClienteSchema } from "@/features/clientes/schemas/create-cliente.schema";
import { ZodError } from "zod";
import { ClienteService } from "@/features/clientes/service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parseamos con valores por defecto
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") ?? "10"));

    const response = await ClienteService.findAll(page, limit);

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Error al obtener clientes",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createClienteSchema.parse(body);

    // Usando la Fachada
    const resultado = await ClienteService.create(validatedData);

    return NextResponse.json(resultado, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: "Error de validación", issues: error.issues },
        { status: 400 },
      );
    }
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    const status = message.includes("registrado") ? 409 : 500;

    return NextResponse.json({ success: false, error: message }, { status });
  }
}
