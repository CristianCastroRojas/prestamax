import { TipoDocumento } from "../entities/tipo-documento.entity";

/**
 * Interfaz del Repositorio de Tipos de Documentos.
 * Define las operaciones permitidas sobre la entidad de dominio.
 */
export interface ITipoDocumentoRepository {
  /**
   * Recupera la lista completa de tipos de documentos disponibles.
   * @returns Promesa con un arreglo de entidades TipoDocumento.
   */
  getAll(): Promise<TipoDocumento[]>;
}
