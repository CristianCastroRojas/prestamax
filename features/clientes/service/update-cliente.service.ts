// features/clientes/service/UpdateClienteService.ts
import { UpdateClienteDTO } from "../dtos/update-cliente.dto";
import { ClienteRepository } from "../repository/cliente.repository";

export const UpdateClienteService = {
  async execute(data: UpdateClienteDTO) {
    const clienteActual = await ClienteRepository.getById(data.id);

    if (!clienteActual) {
      throw new Error(`El cliente con ID ${data.id} no existe.`);
    }

    // Documento
    if (data.numero_documento) {
      const docEnUso = await ClienteRepository.findByDocumento(
        data.numero_documento,
      );

      if (docEnUso && docEnUso.id !== data.id) {
        throw new Error("El número de documento ya pertenece a otro cliente.");
      }
    }

    // Correo
    if (data.correo) {
      const correoEnUso = await ClienteRepository.findByCorreo(data.correo);

      if (correoEnUso && correoEnUso.id !== data.id) {
        throw new Error("El correo ya pertenece a otro cliente.");
      }
    }

    const clienteActualizado = await ClienteRepository.update(data);

    return {
      success: true,
      data: clienteActualizado,
      message: "Datos del cliente actualizados correctamente",
    };
  },
};
