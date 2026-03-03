/**
 * BaseDomainError: Clase base para excepciones de negocio.
 * Extiende la clase Error nativa para mantener la compatibilidad con el stack de JS.
 */
export abstract class BaseDomainError extends Error {
  constructor(
    public readonly message: string, // Mensaje legible para el usuario o log
    public readonly code: string, // Código de error interno (ej: 'CLIENT_NOT_FOUND')
    public readonly statusCode: number = 500, // Código de estado HTTP (por defecto 500)
  ) {
    super(message);

    // Asigna el nombre de la clase hija (ej: 'NotFoundError') a la propiedad name
    this.name = this.constructor.name;

    // Corrige el prototipo para que 'instanceof' funcione correctamente en TypeScript/Windows
    // al usar clases heredadas.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
