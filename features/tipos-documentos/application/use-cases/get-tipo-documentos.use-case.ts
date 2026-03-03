import { TipoDocumentoRepository } from "../../infrastructure/repositories/tipo-documento.repository";
import { TipoDocumentoDTO } from "../dtos/tipo-documento.dto";
import { DatabaseError } from "@/features/shared/domain/errors";

/**
 * Caso de Uso: Obtener todos los tipos de documentos.
 * Se utiliza para cargar selectores (dropdowns) en los formularios de Clientes y Proveedores.
 */
export const GetTipoDocumentosUseCase = {
  async execute(): Promise<TipoDocumentoDTO[]> {
    try {
      // Llamada al repositorio de infraestructura
      return await TipoDocumentoRepository.getAll();
    } catch (error: unknown) {
      // Abstracción del error: transformamos un fallo técnico
      // en un error de dominio comprensible.
      throw new DatabaseError(
        "No se pudieron obtener los tipos de documentos.",
      );
    }
  },
};
