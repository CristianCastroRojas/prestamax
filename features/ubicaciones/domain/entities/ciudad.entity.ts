/**
 * Entidad de Dominio: Ciudad
 * Define el contrato base para cualquier dato que represente una ciudad
 * dentro de la lógica del servidor.
 */
export interface Ciudad {
  // ID único de la ciudad en tu base de datos SQL Server
  id_ciudad: number;

  // Nombre oficial de la ciudad o municipio
  nombre_ciudad: string;

  // Vínculo con el departamento (Foreign Key a nivel de dominio)
  id_departamento: number;
}
