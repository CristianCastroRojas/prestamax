/**
 * DTO para representar los departamentos.
 */
export interface DepartamentoDTO {
  id_departamento: number;
  nombre_departamento: string;
}

/**
 * DTO para representar las ciudades.
 * Incluye la relación con el departamento para permitir filtrados en cascada.
 */
export interface CiudadDTO {
  id_ciudad: number;
  nombre_ciudad: string;
  id_departamento: number; // Clave foránea esencial para el filtrado dinámico
}
