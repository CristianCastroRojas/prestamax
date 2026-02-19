export interface GetAllClienteDTO {
  id: number;
  nombre: string;
  apellido: string;
  numero_documento: string;
  correo: string;
  fecha_nacimiento: string;

  telefono: string;
  barrio: string;
  direccion: string;
  estado: boolean;
  id_tipo_documento: number;
  id_ciudad: number;
  id_departamento: number;
  // Estos campos vienen de los JOINs que hicimos en la consulta
  tipoDocumento: string; 
  ciudad: string;
  departamento: string;
  created_at: Date | string;
}
