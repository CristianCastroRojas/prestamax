/**
 * DTO para el listado general de clientes.
 * Este objeto incluye campos calculados y nombres provenientes de JOINs
 * para facilitar la visualización en tablas y listas sin procesos adicionales.
 */
export interface GetAllClienteDTO {
  // Identificador único
  id: number;

  // Información de identidad
  nombre: string;
  apellido: string;
  numero_documento: string;
  id_tipo_documento: number;
  tipoDocumento: string; // Nombre descriptivo (ej: "Cédula de Ciudadanía")

  // Información de contacto y personal
  correo: string | null;
  telefono: string;
  fecha_nacimiento: string | null;
  estado: boolean;

  // Ubicación y residencia
  direccion: string;
  barrio: string;
  id_departamento: number;
  departamento: string; // Nombre descriptivo del departamento
  id_ciudad: number;
  ciudad: string; // Nombre descriptivo de la ciudad

  // Metadatos de auditoría
  created_at: Date | string;
}
