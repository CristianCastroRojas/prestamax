import { BaseDomainError } from "./base.error";

/**
 * ValidationError: Se lanza cuando los datos de entrada no cumplen con
 * las reglas de negocio o esquemas de validación (Zod).
 */
export class ValidationError extends BaseDomainError {
  constructor(
    mensaje: string,
    public readonly issues?: any[], // Aquí guardamos el array de errores específicos de Zod
  ) {
    // Código 'VALIDATION_ERROR' y status 400 (Estándar para errores del cliente)
    super(mensaje, "VALIDATION_ERROR", 400);
  }
}
