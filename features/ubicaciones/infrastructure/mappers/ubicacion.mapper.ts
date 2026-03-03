import {
  DepartamentoDTO,
  CiudadDTO,
} from "../../application/dtos/ubicacion.dto";
import { Ciudad } from "../../domain/entities/ciudad.entity";
import { Departamento } from "../../domain/entities/departamento.entity";

/**
 * UbicacionMapper
 * Centraliza la lógica de transformación para el módulo de Ubicaciones.
 */
export class UbicacionMapper {
  /**
   * Mapea un objeto de Prisma a la Entidad de Dominio Departamento.
   */
  static toDepartamentoDomain(prismaDepto: any): Departamento {
    return {
      id_departamento: prismaDepto.id_departamento,
      nombre_departamento: prismaDepto.nombre_departamento,
    };
  }

  /**
   * Mapea un objeto de Prisma al DTO de Departamento.
   */
  static toDepartamentoDTO(prismaDepto: any): DepartamentoDTO {
    return {
      id_departamento: prismaDepto.id_departamento,
      nombre_departamento: prismaDepto.nombre_departamento,
    };
  }

  /**
   * Mapea un objeto de Prisma a la Entidad de Dominio Ciudad.
   */
  static toCiudadDomain(prismaCiudad: any): Ciudad {
    return {
      id_ciudad: prismaCiudad.id_ciudad,
      nombre_ciudad: prismaCiudad.nombre_ciudad,
      id_departamento: prismaCiudad.id_departamento,
    };
  }

  /**
   * Mapea un objeto de Prisma al DTO de Ciudad.
   */
  static toCiudadDTO(prismaCiudad: any): CiudadDTO {
    return {
      id_ciudad: prismaCiudad.id_ciudad,
      nombre_ciudad: prismaCiudad.nombre_ciudad,
      id_departamento: prismaCiudad.id_departamento,
    };
  }
}
