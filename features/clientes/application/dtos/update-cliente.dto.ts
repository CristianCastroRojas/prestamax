import { CreateClienteDTO } from "./create-cliente.dto";

/**
 * DTO para la actualización de clientes existentes.
 * Extiende de CreateClienteDTO de forma parcial para permitir
 * que solo se envíen los campos que necesitan ser modificados.
 */
export interface UpdateClienteDTO extends Partial<CreateClienteDTO> {
  // El ID es obligatorio para identificar el registro en la base de datos
  id: number;
}
