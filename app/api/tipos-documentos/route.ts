import { NextResponse } from "next/server";
import { GetTipoDocumentosUseCase } from "@/features/tipos-documentos/application/use-cases/get-tipo-documentos.use-case";
import { handleApiError } from "@/features/shared/infrastructure/errors/handle-api-error";

export async function GET() {
  try {
    const tipos = await GetTipoDocumentosUseCase.execute();
    return NextResponse.json(tipos);
  } catch (error) {
    return handleApiError(error);
  }
}
