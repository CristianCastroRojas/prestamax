/**
 * Entidad de Dominio: Departamento
 * Define la estructura base para los estados o departamentos
 * dentro de la lógica del negocio.
 */
export interface Departamento {
  // Identificador único (PK en SQL Server)
  id_departamento: number;

  // Nombre oficial del departamento (ej: 'Antioquia', 'Cundinamarca')
  nombre_departamento: string;
}
