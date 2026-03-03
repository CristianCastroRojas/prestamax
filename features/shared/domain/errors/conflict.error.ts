import { BaseDomainError } from "./base.error";

/**
 * ConflictError: Se lanza cuando una operación no puede completarse
 * debido a un conflicto con el estado actual del servidor.
 * * Uso común: Duplicidad de llaves únicas
 */
export class ConflictError extends BaseDomainError {
  constructor(mensaje: string) {
    // Código 'CONFLICT' para trazabilidad interna y 409 para la respuesta HTTP
    super(mensaje, "CONFLICT", 409);
  }
}
