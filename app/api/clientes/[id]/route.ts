import { ClienteService } from "@/features/clientes/service";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const clienteId = parseInt(id);

    if (isNaN(clienteId))
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });

    // Usando la Fachada
    const resultado = await ClienteService.findOne(clienteId);
    return NextResponse.json(resultado, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error al obtener cliente";
    const status = message.includes("no existe") ? 404 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const clienteId = parseInt(id);
    const body = await req.json();

    // Usando la Fachada: Inyectamos el ID en el objeto para cumplir con el DTO
    const resultado = await ClienteService.update({ ...body, id: clienteId });
    return NextResponse.json(resultado, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error al actualizar";
    const status = message.includes("no existe")
      ? 404
      : message.includes("pertenece")
        ? 409
        : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const clienteId = parseInt(id);

    // Usando la Fachada
    const resultado = await ClienteService.remove(clienteId);
    return NextResponse.json(resultado, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error al eliminar";
    const status = message.includes("no existe") ? 404 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
