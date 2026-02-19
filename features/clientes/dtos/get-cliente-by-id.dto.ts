export interface GetByIdClienteDTO {
  id: number;
  nombre: string;
  apellido: string;
  numero_documento: string;
  correo: string;
  fecha_nacimiento: string | Date;
  telefono: string;
  
  // IDs para el Formulario (Selects)
  id_tipo_documento: number; 
  id_ciudad: number;
  id_departamento: number;

  // Nombres para mostrar en texto plano
  tipo_documento_nombre: string;
  ciudad_nombre: string;
  departamento_nombre: string;

  barrio: string;
  direccion: string;
  estado: boolean;
  created_at: Date;
  updated_at: Date;
}