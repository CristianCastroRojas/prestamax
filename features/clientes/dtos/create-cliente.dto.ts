export interface CreateClienteDTO {
  nombre: string;
  apellido: string;
  numero_documento: string;
  correo?: string | null;
  fecha_nacimiento?: string | null;
  telefono: string;
  id_tipo_documento: number;
  id_ciudad: number;
  id_departamento: number;
  barrio: string;
  direccion: string;
  estado: boolean;
}
