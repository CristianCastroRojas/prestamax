export interface CreateClienteDTO {
  nombre: string;
  apellido: string;
  numero_documento: string;
  correo: string;
  fecha_nacimiento: string;
  telefono: string;
  id_tipo_documento: number;
  id_ciudad: number;
  id_departamento: number;
  barrio: string;
  direccion: string;
  estado: boolean;
}