export * from "./create-cliente.use-case";
export * from "./get-all-clientes.use-case";
export * from "./get-cliente-by-id.use-case";
export * from "./update-cliente.use-case";
export * from "./delete-cliente.use-case";

import { CreateClienteUseCase } from "./create-cliente.use-case";
import { GetAllClienteUseCase } from "./get-all-clientes.use-case";
import { GetByIdClienteUseCase } from "./get-cliente-by-id.use-case";
import { UpdateClienteUseCase } from "./update-cliente.use-case";
import { DeleteClienteUseCase } from "./delete-cliente.use-case";

/**
 * ClienteService actúa como el punto único de entrada (Facade)
 * para todas las acciones del módulo de clientes.
 */
export const ClienteService = {
  create: CreateClienteUseCase.execute,
  findAll: GetAllClienteUseCase.execute,
  findOne: GetByIdClienteUseCase.execute,
  update: UpdateClienteUseCase.execute,
  remove: DeleteClienteUseCase.execute,
};
