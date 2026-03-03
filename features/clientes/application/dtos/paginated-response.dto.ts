/**
 * Interfaz genérica para respuestas paginadas.
 * Se utiliza para envolver cualquier tipo de dato (T) con metadatos de navegación.
 */
export interface PaginatedResponseDTO<T> {
  // Arreglo de elementos del tipo solicitado (ej: Cliente[], Producto[])
  data: T[];

  // Información de control para la interfaz de paginación
  meta: {
    // Cantidad total de registros existentes en la base de datos
    total: number;
    // Índice de la página actual
    page: number;
    // Cálculo total de páginas disponibles (total / limit)
    lastPage: number;
    // Cantidad de registros solicitados por página
    limit: number;
  };
}
