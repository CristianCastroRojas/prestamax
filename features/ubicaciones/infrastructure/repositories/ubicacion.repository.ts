import prisma from "@/lib/prisma";
import {
  CiudadDTO,
  DepartamentoDTO,
} from "../../application/dtos/ubicacion.dto";
import { IUbicacionRepository } from "../../domain/repositories/i-ubicacion.repository";
import { UbicacionMapper } from "../mappers/ubicacion.mapper";

/**
 * Implementación de infraestructura para Ubicaciones.
 * Ejecuta las consultas reales a la base de datos a través de Prisma.
 */
export const UbicacionRepository: IUbicacionRepository = {
  /**
   * Recupera todos los departamentos ordenados alfabéticamente.
   */
  async getDepartamentos(): Promise<DepartamentoDTO[]> {
    const deptos = await prisma.departamento.findMany({
      orderBy: { nombre_departamento: "asc" },
    });
    return deptos.map(UbicacionMapper.toDepartamentoDTO);
  },

  /**
   * Recupera todas las ciudades ordenadas alfabéticamente.
   * Nota: El id_departamento incluido en cada ciudad permitirá el filtrado en el frontend.
   */
  async getCiudades(): Promise<CiudadDTO[]> {
    const ciudades = await prisma.ciudad.findMany({
      orderBy: { nombre_ciudad: "asc" },
    });
    return ciudades.map(UbicacionMapper.toCiudadDTO);
  },
};
