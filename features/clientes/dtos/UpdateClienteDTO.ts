import { CreateClienteDTO } from "./CreateClienteDTO";

export interface UpdateClienteDTO extends Partial<CreateClienteDTO> {
  id: number;
}