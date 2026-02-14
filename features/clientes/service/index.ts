export * from "./CreateCliente";
export * from "./GetAllCliente";
export * from "./GetByIdCliente";
export * from "./UpdateCliente";
export * from "./DeleteCliente";

import { CreateClienteService } from "./CreateCliente";
import { GetAllClienteService } from "./GetAllCliente";
import { GetByIdClienteService } from "./GetByIdCliente";
import { UpdateClienteService } from "./UpdateCliente";
import { DeleteClienteService } from "./DeleteCliente";

/**
 * ClienteService actúa como el punto único de entrada (Facade)
 * para todas las acciones del módulo de clientes.
 */
export const ClienteService = {
  create: CreateClienteService.execute,
  findAll: GetAllClienteService.execute,
  findOne: GetByIdClienteService.execute,
  update: UpdateClienteService.execute,
  remove: DeleteClienteService.execute,
};
