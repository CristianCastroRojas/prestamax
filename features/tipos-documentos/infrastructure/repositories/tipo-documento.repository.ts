import prisma from "@/lib/prisma";
import { ITipoDocumentoRepository } from "../../domain/repositories/i-tipo-documento.repository";
import { TipoDocumento } from "../../domain/entities/tipo-documento.entity";
import { TipoDocumentoMapper } from "../mappers/tipo-documento.mapper";

/**
 * Implementación de infraestructura para el acceso a Tipos de Documentos.
 * Se comunica directamente con la base de datos a través de Prisma.
 */
export const TipoDocumentoRepository: ITipoDocumentoRepository = {
  async getAll(): Promise<TipoDocumento[]> {
    const tipos = await prisma.tipoDocumento.findMany({
      orderBy: {
        nombre_tipo_documento: "asc",
      },
    });

    return tipos.map(TipoDocumentoMapper.toDomain);
  },
};
