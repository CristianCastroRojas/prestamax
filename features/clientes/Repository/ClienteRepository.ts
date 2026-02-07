import prisma from "@/lib/prisma";
import { CreateClienteDTO } from "../DTOs/CreateClienteDTO";

import { GetByIdClienteDTO } from "../DTOs/GetByIdClienteDTO";
import { GetAllClienteDTO } from "../DTOs/GetAllClienteDTO";
import { UpdateClienteDTO } from "../DTOs/UpdateClienteDTO";

export const ClienteRepository = {
  /**
   * Crea un cliente y retorna el objeto completo creado.
   */
  async create(data: CreateClienteDTO) {
    const docExiste = await this.findByDocumento(data.numero_documento);
    if (docExiste)
      throw new Error("El número de documento ya está registrado.");

    const correoExiste = await this.findByCorreo(data.correo);
    if (correoExiste)
      throw new Error("El correo electrónico ya está registrado.");
    return await prisma.cliente.create({
      data: {
        ...data,
        fecha_nacimiento: new Date(data.fecha_nacimiento),
      },
    });
  },

  /**
   * Obtiene todos los clientes incluyendo nombres de ciudad y tipo de documento.
   */

  async getAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: GetAllClienteDTO[]; total: number }> {
    const skip = (page - 1) * limit;

    try {
      // Ejecutamos de forma independiente pero concurrente
      // Promise.all es más ligero que $transaction para lecturas
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

      const mappedData = clientes.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        apellido: c.apellido,
        numero_documento: c.numero_documento,
        estado: c.estado,
        tipoDocumento: c.tipo_documento.nombre_tipo_documento || "N/A",
        ciudad: c.ciudad.nombre_ciudad || "N/A",
        departamento: c.departamento.nombre_departamento || "N/A",
        created_at: c.created_at,
      }));

      return { data: mappedData, total };
    } catch (error) {
      console.error("Error en ClienteRepository.getAll:", error);
      throw new Error("No se pudo conectar con la base de datos");
    }
  },

  /**
   * Obtiene un cliente por su ID.
   */
  async getById(id: number): Promise<GetByIdClienteDTO | null> {
    const cliente = await prisma.cliente.findUnique({
      where: { id: id }, // Aquí usamos 'id' como pediste
      include: {
        tipo_documento: true,
        ciudad: true,
        departamento: true,
      },
    });

    if (!cliente) return null;

    return {
      id: cliente.id, // Tu ID simple
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      numero_documento: cliente.numero_documento,
      correo: cliente.correo,
      fecha_nacimiento: cliente.fecha_nacimiento,
      telefono: cliente.telefono,

      // Nombres (Para mostrar en texto o etiquetas)
      tipo_documento_nombre: cliente.tipo_documento.nombre_tipo_documento,
      ciudad_nombre: cliente.ciudad.nombre_ciudad,
      departamento_nombre: cliente.departamento.nombre_departamento,

      // IDs de relación (VITAL para que los Selects del formulario de edición funcionen)
      id_tipo_documento: cliente.id_tipo_documento,
      id_ciudad: cliente.id_ciudad,
      id_departamento: cliente.id_departamento,

      barrio: cliente.barrio,
      direccion: cliente.direccion,
      estado: cliente.estado,
      created_at: cliente.created_at,
      updated_at: cliente.updated_at,
    };
  },
  /**
   * Actualiza un cliente por su ID.
   */
  async update(data: UpdateClienteDTO) {
    const { id, ...updateData } = data;

    // 1. Validar si el documento ya lo tiene OTRO cliente (excluyendo al actual)
    if (updateData.numero_documento) {
      const docEnUso = await this.findByDocumento(updateData.numero_documento);
      if (docEnUso && docEnUso.id !== id) {
        throw new Error(
          "El nuevo número de documento ya pertenece a otro cliente.",
        );
      }
    }

    // 2. Validar si el correo ya lo tiene OTRO cliente
    if (updateData.correo) {
      const correoEnUso = await this.findByCorreo(updateData.correo);
      if (correoEnUso && correoEnUso.id !== id) {
        throw new Error("El nuevo correo ya pertenece a otro cliente.");
      }
    }

    // 3. Proceder con la actualización
    return await prisma.cliente.update({
      where: { id },
      data: {
        ...updateData,
        // Solo convertimos la fecha si viene en el update
        ...(updateData.fecha_nacimiento && {
          fecha_nacimiento: new Date(updateData.fecha_nacimiento),
        }),
      },
    });
  },

  /**
   * Elimina un cliente por su ID.
   */
  async delete(id: number) {
    return await prisma.cliente.delete({
      where: { id },
    });
  },

  async findByDocumento(numero_documento: string) {
    return await prisma.cliente.findUnique({
      where: { numero_documento },
      select: { id: true, nombre: true }, // Solo traemos lo necesario
    });
  },

  async findByCorreo(correo: string) {
    return await prisma.cliente.findUnique({
      where: { correo },
      select: { id: true, nombre: true },
    });
  },
};
