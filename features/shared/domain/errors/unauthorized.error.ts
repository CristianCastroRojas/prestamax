import { BaseDomainError } from "./base.error";

/**
 * UnauthorizedError: Se lanza cuando un usuario intenta acceder a un recurso
 * sin estar autenticado o cuando su sesión ha expirado.
 * Retorna un código de estado HTTP 401.
 */
export class UnauthorizedError extends BaseDomainError {
  constructor(
    mensaje: string = "No tienes permisos para realizar esta acción.",
  ) {
    // Código 'UNAUTHORIZED' para el sistema y 401 (estándar de identidad)
    super(mensaje, "UNAUTHORIZED", 401);
  }
}
