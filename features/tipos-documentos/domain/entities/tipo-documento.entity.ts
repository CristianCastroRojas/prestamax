/**
 * Entidad de Dominio: TipoDocumento
 * Representa la estructura pura de los datos en el núcleo del negocio.
 */
export interface TipoDocumento {
  // Identificador único definido en el modelo de datos (Windows/SQL Server)
  id_tipo_documento: number;

  // Etiqueta oficial del documento (ej: 'Cédula de Ciudadanía')
  nombre_tipo_documento: string;
}
