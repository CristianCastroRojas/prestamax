import { TipoDocumento } from "../../domain/entities/tipo-documento.entity";
import { TipoDocumentoDTO } from "../../application/dtos/tipo-documento.dto";

/**
 * TipoDocumentoMapper
 * Centraliza la lógica de transformación para el módulo de Tipos de Documentos.
 */
export class TipoDocumentoMapper {
  /**
   * Mapea un objeto de Prisma a la Entidad de Dominio TipoDocumento.
   */
  static toDomain(prismaTipo: any): TipoDocumento {
    return {
      id_tipo_documento: prismaTipo.id_tipo_documento,
      nombre_tipo_documento: prismaTipo.nombre_tipo_documento,
    };
  }

  /**
   * Mapea un objeto de Prisma al DTO de TipoDocumento.
   */
  static toDTO(prismaTipo: any): TipoDocumentoDTO {
    return {
      id_tipo_documento: prismaTipo.id_tipo_documento,
      nombre_tipo_documento: prismaTipo.nombre_tipo_documento,
    };
  }
}
