import { BaseDomainError } from "./base.error";

/**
 * NotFoundError: Se lanza cuando un recurso solicitado no existe.
 * Retorna un código de estado HTTP 404.
 */
export class NotFoundError extends BaseDomainError {
  constructor(entidad: string, id?: string | number) {
    // Genera un mensaje amigable: "Cliente con identificador 5 no fue encontrado"
    // o simplemente "Cliente no fue encontrado" si no se proporciona ID.
    const mensaje = id
      ? `${entidad} con identificador ${id} no fue encontrado.`
      : `${entidad} no fue encontrado.`;

    super(mensaje, "NOT_FOUND", 404);
  }
}
