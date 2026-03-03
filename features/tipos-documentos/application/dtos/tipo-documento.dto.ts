/**
 * DTO para la transferencia de Tipos de Documento.
 * Utilizado para mapear la información de la tabla maestra
 * (ej: CC, TI, NIT, Pasaporte) hacia la interfaz de usuario.
 */
export interface TipoDocumentoDTO {
  // Identificador único en la base de datos (Primary Key)
  id_tipo_documento: number;

  // Nombre descriptivo para mostrar en los Selects del frontend
  nombre_tipo_documento: string;
}
