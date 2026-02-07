import prisma from "@/lib/prisma";

export interface DepartamentoDTO {
  id_departamento: number;
  nombre_departamento: string;
}

export interface CiudadDTO {
  id_ciudad: number;
  nombre_ciudad: string;
  id_departamento: number; // Clave foránea para filtrar
}

export const UbicacionRepository = {
  async getDepartamentos() {
    return await prisma.departamento.findMany({
      orderBy: { nombre_departamento: "asc" },
    });
  },
  async getCiudades() {
    return await prisma.ciudad.findMany({ orderBy: { nombre_ciudad: "asc" } });
  },
};

export const GetUbicacionesService = {
  async execute() {
    // Usamos Promise.all para que ambas consultas se disparen al mismo tiempo
    // Esto es mucho más rápido que hacer dos "await" por separado
    const [departamentos, ciudades] = await Promise.all([
      UbicacionRepository.getDepartamentos(),
      UbicacionRepository.getCiudades(),
    ]);

    return { departamentos, ciudades };
  },
};
