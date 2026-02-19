export interface DepartamentoDTO {
  id_departamento: number;
  nombre_departamento: string;
}

export interface CiudadDTO {
  id_ciudad: number;
  nombre_ciudad: string;
  id_departamento: number; // Clave foránea para filtrar
}
