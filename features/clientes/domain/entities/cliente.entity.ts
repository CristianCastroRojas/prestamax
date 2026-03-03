/**
 * Entidad de Dominio: Cliente
 * Representa la estructura pura del objeto de negocio tal como reside en la persistencia.
 * Es el contrato base del cual derivan los DTOs y Mappers.
 */
export interface Cliente {
  // Identificadores
  id: number;
  id_tipo_documento: number;

  // Información personal
  nombre: string;
  apellido: string;
  numero_documento: string;
  fecha_nacimiento: Date | null;

  // Datos de contacto y estado
  correo: string | null;
  telefono: string;
  estado: boolean | string;

  // Localización (Foreign Keys)
  id_ciudad: number;
  barrio: string;
  direccion: string;

  // Auditoría (Valores nativos de motor de BD)
  created_at: Date;
  updated_at: Date;
}
