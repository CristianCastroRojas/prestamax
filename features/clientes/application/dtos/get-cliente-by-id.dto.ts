/**
 * DTO detallado para la consulta de un cliente por ID.
 * Proporciona tanto los identificadores numéricos (para componentes de formulario)
 * como las descripciones textuales (para la interfaz de usuario).
 */
export interface GetByIdClienteDTO {
  // Identificación única del registro
  id: number;

  // Información personal y de identidad
  nombre: string;
  apellido: string;
  numero_documento: string;
  id_tipo_documento: number;
  tipo_documento_nombre: string; // Ej: "Cédula de Ciudadanía"

  // Datos de contacto y salud
  correo: string | null;
  telefono: string;
  fecha_nacimiento: string | Date | null;
  estado: boolean;

  // Estructura de ubicación geográfica
  id_departamento: number;
  departamento_nombre: string;
  id_ciudad: number;
  ciudad_nombre: string;
  barrio: string;
  direccion: string;

  // Trazabilidad y auditoría
  created_at: Date;
  updated_at: Date;
}
