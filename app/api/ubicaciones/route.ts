import { NextResponse } from "next/server";
import { GetUbicacionesUseCase } from "@/features/ubicaciones/application/use-cases/get-ubicaciones.use-case";
import { handleApiError } from "@/features/shared/infrastructure/errors/handle-api-error";

export async function GET() {
  try {
    const ubicaciones = await GetUbicacionesUseCase.execute();
    return NextResponse.json(ubicaciones);
  } catch (error) {
    return handleApiError(error);
  }
}
