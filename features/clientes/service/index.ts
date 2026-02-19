export * from "./create-cliente.service";
export * from "./get-all-clientes.service";
export * from "./get-cliente-by-id.service";
export * from "./update-cliente.service";
export * from "./delete-cliente.service";

import { CreateClienteService } from "./create-cliente.service";
import { GetAllClienteService } from "./get-all-clientes.service";
import { GetByIdClienteService } from "./get-cliente-by-id.service";
import { UpdateClienteService } from "./update-cliente.service";
import { DeleteClienteService } from "./delete-cliente.service";

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
