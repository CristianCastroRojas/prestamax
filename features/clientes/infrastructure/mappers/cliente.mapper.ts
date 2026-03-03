import { Cliente } from "../../domain/entities/cliente.entity";
import { GetAllClienteDTO } from "../../application/dtos/get-all-clientes.dto";
import { GetByIdClienteDTO } from "../../application/dtos/get-cliente-by-id.dto";

/**
 * ClienteMapper
 * Centraliza la lógica de transformación entre los modelos de persistencia (Prisma)
 * y los objetos de dominio o aplicación (DTOs).
 */
export class ClienteMapper {
  /**
   * Mapea un objeto de Prisma a la Entidad de Dominio Cliente pura.
   */
  static toDomain(prismaCliente: any): Cliente {
    return {
      id: prismaCliente.id,
      nombre: prismaCliente.nombre,
      apellido: prismaCliente.apellido,
      numero_documento: prismaCliente.numero_documento,
      id_tipo_documento: prismaCliente.id_tipo_documento,
      correo: prismaCliente.correo,
      telefono: prismaCliente.telefono,
      fecha_nacimiento: prismaCliente.fecha_nacimiento,
      estado: prismaCliente.estado,
      id_ciudad: prismaCliente.id_ciudad,
      barrio: prismaCliente.barrio,
      direccion: prismaCliente.direccion,
      created_at: prismaCliente.created_at,
      updated_at: prismaCliente.updated_at,
    };
  }

  /**
   * Mapea un objeto de Prisma (con relaciones) al DTO de listado paginado.
   */
  static toGetAllDTO(c: any): GetAllClienteDTO {
    return {
      id: c.id,
      nombre: c.nombre,
      apellido: c.apellido,
      numero_documento: c.numero_documento,
      correo: c.correo,
      telefono: c.telefono,
      estado: typeof c.estado === "string" ? c.estado === "true" : c.estado,
      fecha_nacimiento: c.fecha_nacimiento
        ? c.fecha_nacimiento.toISOString()
        : null,
      id_tipo_documento: c.id_tipo_documento,
      tipoDocumento: c.tipo_documento.nombre_tipo_documento,
      id_ciudad: c.id_ciudad,
      ciudad: c.ciudad.nombre_ciudad,
      id_departamento: c.ciudad.id_departamento,
      departamento: c.ciudad.departamento.nombre_departamento,
      barrio: c.barrio,
      direccion: c.direccion,
      created_at: c.created_at,
    };
  }

  /**
   * Mapea un objeto de Prisma (con relaciones completas) al DTO de detalle por ID.
   */
  static toGetByIdDTO(cliente: any): GetByIdClienteDTO {
    return {
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      numero_documento: cliente.numero_documento,
      id_tipo_documento: cliente.id_tipo_documento,
      tipo_documento_nombre: cliente.tipo_documento.nombre_tipo_documento,
      correo: cliente.correo,
      telefono: cliente.telefono,
      fecha_nacimiento: cliente.fecha_nacimiento,
      estado: cliente.estado,
      id_departamento: cliente.ciudad.id_departamento,
      departamento_nombre: cliente.ciudad.departamento.nombre_departamento,
      id_ciudad: cliente.id_ciudad,
      ciudad_nombre: cliente.ciudad.nombre_ciudad,
      barrio: cliente.barrio,
      direccion: cliente.direccion,
      created_at: cliente.created_at,
      updated_at: cliente.updated_at,
    };
  }
}
