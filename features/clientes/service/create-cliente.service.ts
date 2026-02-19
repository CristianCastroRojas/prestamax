// features/clientes/service/CreateClienteService.ts
import { CreateClienteDTO } from "../dtos/create-cliente.dto";
import { ClienteRepository } from "../repository/cliente.repository";

export const CreateClienteService = {
  async execute(data: CreateClienteDTO) {
    // 1. Validaciones de negocio
    const docExiste = await ClienteRepository.findByDocumento(
      data.numero_documento,
    );
    if (docExiste) {
      throw new Error("El número de documento ya está registrado.");
    }

    const correoExiste = await ClienteRepository.findByCorreo(data.correo);
    if (correoExiste) {
      throw new Error("El correo electrónico ya está registrado.");
    }

    // 2. Persistencia
    const cliente = await ClienteRepository.create(data);

    return {
      success: true,
      data: cliente,
      message: "Cliente registrado exitosamente en el sistema",
    };
  },
};
