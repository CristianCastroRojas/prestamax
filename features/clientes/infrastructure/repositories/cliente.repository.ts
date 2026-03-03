import prisma from "@/lib/prisma";
import { CreateClienteDTO } from "../../application/dtos/create-cliente.dto";
import { GetAllClienteDTO } from "../../application/dtos/get-all-clientes.dto";
import { GetByIdClienteDTO } from "../../application/dtos/get-cliente-by-id.dto";
import { UpdateClienteDTO } from "../../application/dtos/update-cliente.dto";
import { IClienteRepository } from "../../domain/repositories/i-cliente.repository";
import { Cliente } from "../../domain/entities/cliente.entity";
import { ClienteMapper } from "../mappers/cliente.mapper";

/**
 * Implementación concreta del repositorio utilizando Prisma ORM.
 * Maneja la persistencia y las relaciones complejas (Joins).
 */
export const ClienteRepository: IClienteRepository = {
  async create(data: CreateClienteDTO): Promise<Cliente> {
    const { id_tipo_documento, id_ciudad, ...rest } = data;

    const created = await prisma.cliente.create({
      data: {
        ...rest,
        correo: data.correo || null,
        fecha_nacimiento: data.fecha_nacimiento
          ? new Date(data.fecha_nacimiento)
          : null,
        // Usamos connect para vincular las relaciones por sus IDs
        tipo_documento: { connect: { id_tipo_documento } },
        ciudad: { connect: { id_ciudad } },
      } as any,
    });

    return ClienteMapper.toDomain(created);
  },

  async update(data: UpdateClienteDTO): Promise<Cliente> {
    const { id, id_tipo_documento, id_ciudad, ...updateData } = data;

    const updated = await prisma.cliente.update({
      where: { id },
      data: {
        ...updateData,
        // Lógica para no sobreescribir con null si el campo viene undefined (no enviado)
        correo:
          updateData.correo === undefined
            ? undefined
            : updateData.correo || null,
        fecha_nacimiento:
          updateData.fecha_nacimiento === undefined
            ? undefined
            : updateData.fecha_nacimiento
              ? new Date(updateData.fecha_nacimiento)
              : null,

        // Actualización condicional de relaciones
        ...(id_tipo_documento && {
          tipo_documento: { connect: { id_tipo_documento } },
        }),
        ...(id_ciudad && { ciudad: { connect: { id_ciudad } } }),
      } as any,
    });

    return ClienteMapper.toDomain(updated);
  },

  async getAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: GetAllClienteDTO[]; total: number }> {
    const skip = (page - 1) * limit;

    // Ejecutamos conteo y búsqueda en paralelo para mejorar performance
    const [total, clientes] = await Promise.all([
      prisma.cliente.count(),
      prisma.cliente.findMany({
        skip,
        take: limit,
        include: {
          tipo_documento: { select: { nombre_tipo_documento: true } },
          ciudad: {
            include: {
              departamento: { select: { nombre_departamento: true } },
            },
          },
        },
        orderBy: { created_at: "desc" },
      }),
    ]);

    return {
      total,
      data: clientes.map(ClienteMapper.toGetAllDTO),
    };
  },

  async getById(id: number): Promise<GetByIdClienteDTO | null> {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        tipo_documento: true,
        ciudad: {
          include: { departamento: true },
        },
      },
    });

    if (!cliente) return null;

    return ClienteMapper.toGetByIdDTO(cliente);
  },

  async delete(id: number): Promise<Cliente> {
    return prisma.cliente.delete({
      where: { id },
    }) as unknown as Promise<Cliente>;
  },

  async findByDocumento(numero_documento: string) {
    return prisma.cliente.findUnique({
      where: { numero_documento },
      select: { id: true },
    });
  },

  async findByCorreo(correo?: string | null) {
    if (!correo) return null;
    return prisma.cliente.findUnique({
      where: { correo },
      select: { id: true },
    });
  },
};
