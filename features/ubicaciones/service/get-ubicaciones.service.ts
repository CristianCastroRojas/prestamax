// features/ubicaciones/service/GetUbicacionesService.ts
import { UbicacionRepository } from "../repository/ubicacion.repository";

export const GetUbicacionesService = {
  async execute() {
    const [departamentos, ciudades] = await Promise.all([
      UbicacionRepository.getDepartamentos(),
      UbicacionRepository.getCiudades(),
    ]);

    return { departamentos, ciudades };
  },
};
