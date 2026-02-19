import { CreateClienteDTO } from "./create-cliente.dto";

export interface UpdateClienteDTO extends Partial<CreateClienteDTO> {
  id: number;
}
