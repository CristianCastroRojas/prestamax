// features/clientes/repository/ClienteRepository.ts
import prisma from "@/lib/prisma";
import { CreateClienteDTO } from "../dtos/create-cliente.dto";
import { GetAllClienteDTO } from "../dtos/get-all-clientes.dto";
import { GetByIdClienteDTO } from "../dtos/get-cliente-by-id.dto";
import { UpdateClienteDTO } from "../dtos/update-cliente.dto";

export const ClienteRepository = {
  async create(data: CreateClienteDTO) {
    return prisma.cliente.create({
      data: {
        ...data,
        fecha_nacimiento: new Date(data.fecha_nacimiento),
      },
    });
  },

  async update(data: UpdateClienteDTO) {
    const { id, ...updateData } = data;

    return prisma.cliente.update({
      where: { id },
      data: {
        ...updateData,
        ...(updateData.fecha_nacimiento && {
          fecha_nacimiento: new Date(updateData.fecha_nacimiento),
        }),
      },
    });
  },

  async getAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: GetAllClienteDTO[]; total: number }> {
    const skip = (page - 1) * limit;

    const [total, clientes] = await Promise.all([
      prisma.cliente.count(),
      prisma.cliente.findMany({
        skip,
        take: limit,
        include: {
          tipo_documento: { select: { nombre_tipo_documento: true } },
          ciudad: { select: { nombre_ciudad: true } },
          departamento: { select: { nombre_departamento: true } },
        },
        orderBy: { created_at: "desc" },
      }),
    ]);

    return {
      total,
      data: clientes.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        apellido: c.apellido,
        numero_documento: c.numero_documento,
        correo: c.correo,
        fecha_nacimiento: c.fecha_nacimiento.toISOString(),
        telefono: c.telefono,
        barrio: c.barrio,
        direccion: c.direccion,
        estado: c.estado,
        id_tipo_documento: c.id_tipo_documento,
        id_ciudad: c.id_ciudad,
        id_departamento: c.id_departamento,
        tipoDocumento: c.tipo_documento.nombre_tipo_documento,
        ciudad: c.ciudad.nombre_ciudad,
        departamento: c.departamento.nombre_departamento,
        created_at: c.created_at,
      })),
    };
  },

  async getById(id: number): Promise<GetByIdClienteDTO | null> {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        tipo_documento: true,
        ciudad: true,
        departamento: true,
      },
    });

    if (!cliente) return null;

    return {
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      numero_documento: cliente.numero_documento,
      correo: cliente.correo,
      fecha_nacimiento: cliente.fecha_nacimiento,
      telefono: cliente.telefono,
      barrio: cliente.barrio,
      direccion: cliente.direccion,
      estado: cliente.estado,
      id_tipo_documento: cliente.id_tipo_documento,
      id_ciudad: cliente.id_ciudad,
      id_departamento: cliente.id_departamento,
      tipo_documento_nombre: cliente.tipo_documento.nombre_tipo_documento,
      ciudad_nombre: cliente.ciudad.nombre_ciudad,
      departamento_nombre: cliente.departamento.nombre_departamento,
      created_at: cliente.created_at,
      updated_at: cliente.updated_at,
    };
  },

  async delete(id: number) {
    return prisma.cliente.delete({ where: { id } });
  },

  async findByDocumento(numero_documento: string) {
    return prisma.cliente.findUnique({
      where: { numero_documento },
      select: { id: true },
    });
  },

  async findByCorreo(correo: string) {
    return prisma.cliente.findUnique({
      where: { correo },
      select: { id: true },
    });
  },
};
