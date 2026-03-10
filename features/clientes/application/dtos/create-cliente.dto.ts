/**
 * DTO para la creación de un nuevo cliente.
 * Representa la estructura de datos requerida por la capa de aplicación
 * y validada por la infraestructura antes de la persistencia.
 */
export interface CreateClienteDTO {
  // Información personal básica
  nombre: string;
  apellido: string;
  numero_documento: string;
  id_tipo_documento: number;

  // Datos de contacto y fechas
  correo?: string | null;
  telefono: string;
  fecha_nacimiento?: string | null; // Formato ISO o string de fecha

  // Ubicación geográfica
  id_ciudad: number;
  barrio: string;
  direccion: string;

  // Estado administrativo del registro
  estado: boolean;

  // Campo auxiliar utilizado en el UI para filtrado
  id_departamento?: number;
}
