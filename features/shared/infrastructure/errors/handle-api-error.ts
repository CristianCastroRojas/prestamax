import { NextResponse } from "next/server";
import { BaseDomainError } from "../../domain/errors/base.error";
import { ZodError } from "zod";

/**
 * Utilidad centralizada para manejar errores en las rutas de API.
 * Convierte errores de dominio, validación y base de datos en respuestas HTTP consistentes.
 */
export function handleApiError(error: unknown) {
  // 1. Errores de Dominio (Personalizados: NotFound, Conflict, etc.)
  // Gracias a 'instanceof BaseDomainError', capturamos cualquier error que herede de nuestra clase base.
  if (error instanceof BaseDomainError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode },
    );
  }

  // 2. Errores de Validación (Zod)
  // Transforma el complejo objeto de Zod en un array de 'issues' simple para el frontend.
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: "Error de validación en los datos enviados.",
        code: "VALIDATION_ERROR",
        issues: error.issues.map((issue) => ({
          campo: issue.path.join("."),
          mensaje: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  // 3. Errores de Prisma / Base de Datos
  // Protegemos la infraestructura. No enviamos el error crudo de SQL Server/Prisma
  // para evitar exponer nombres de tablas o columnas sensibles.
  const errorName = (error as any)?.constructor?.name;
  if (
    errorName?.includes("PrismaClient") ||
    errorName === "PrismaClientKnownRequestError"
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Ha ocurrido un problema al conectar con la base de datos.",
        code: "DATABASE_ERROR",
      },
      { status: 500 },
    );
  }

  // 4. Errores genéricos o no controlados
  // Los registramos en la consola del servidor para depuración (logs de Windows/Vercel).
  console.error("[API_ERROR]:", error);

  const message =
    error instanceof Error
      ? error.message
      : "Ha ocurrido un error inesperado en el servidor.";

  return NextResponse.json(
    {
      success: false,
      error: message,
      code: "INTERNAL_SERVER_ERROR",
    },
    { status: 500 },
  );
}
