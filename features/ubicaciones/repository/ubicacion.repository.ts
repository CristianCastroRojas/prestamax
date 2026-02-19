import prisma from "@/lib/prisma";
import { CiudadDTO, DepartamentoDTO } from "../dtos/ubicacion.dto";

export const UbicacionRepository = {
  async getDepartamentos(): Promise<DepartamentoDTO[]> {
    return prisma.departamento.findMany({
      orderBy: { nombre_departamento: "asc" },
    });
  },

  async getCiudades(): Promise<CiudadDTO[]> {
    return prisma.ciudad.findMany({
      orderBy: { nombre_ciudad: "asc" },
    });
  },
};
