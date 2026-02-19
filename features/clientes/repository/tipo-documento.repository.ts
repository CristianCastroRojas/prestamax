import prisma from "@/lib/prisma";

export const TipoDocumentoRepository = {
  async getAll() : Promise<TipoDocumentoDTO[]> {
    return await prisma.tipoDocumento.findMany({
      select: {
        id_tipo_documento: true,
        nombre_tipo_documento: true,
      },
      orderBy: {
        nombre_tipo_documento: "asc",
      },
    });
  },
};

export const GetTipoDocumentosService = {
  async execute() {
    return await TipoDocumentoRepository.getAll();
  }
};

export interface TipoDocumentoDTO {
  id_tipo_documento: number;
  nombre_tipo_documento: string;
}