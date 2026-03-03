import { BaseDomainError } from "./base.error";

/**
 * DatabaseError: Se lanza cuando ocurre un fallo técnico en la capa de persistencia.
 * Hereda de BaseDomainError con un status 500 (Internal Server Error).
 */
export class DatabaseError extends BaseDomainError {
  constructor(mensaje: string = "Error de conexión o de base de datos.") {
    // Código 'DATABASE_ERROR' para logs y 500 para la respuesta HTTP
    super(mensaje, "DATABASE_ERROR", 500);
  }
}
