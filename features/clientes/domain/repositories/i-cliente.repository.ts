import { Cliente } from "../entities/cliente.entity";
import { CreateClienteDTO } from "../../application/dtos/create-cliente.dto";
import { UpdateClienteDTO } from "../../application/dtos/update-cliente.dto";
import { GetAllClienteDTO } from "../../application/dtos/get-all-clientes.dto";
import { GetByIdClienteDTO } from "../../application/dtos/get-cliente-by-id.dto";

/**
 * Interface IClienteRepository
 * Define las operaciones permitidas sobre el dominio de Clientes.
 * Sigue el principio de Inversión de Dependencia (DIP).
 */
export interface IClienteRepository {
  // --- Operaciones de Escritura ---

  /** Crea un nuevo registro y retorna la entidad pura */
  create(data: CreateClienteDTO): Promise<Cliente>;

  /** Actualiza parcialmente un cliente y retorna la entidad modificada */
  update(data: UpdateClienteDTO): Promise<Cliente>;

  /** Realiza el borrado del registro por ID */
  delete(id: number): Promise<Cliente>;

  // --- Operaciones de Lectura (Queries) ---

  /** Obtiene listado paginado con nombres descriptivos de relaciones */
  getAll(
    page?: number,
    limit?: number,
  ): Promise<{ data: GetAllClienteDTO[]; total: number }>;

  /** Obtiene el detalle completo de un cliente incluyendo nombres de ciudades/deptos */
  getById(id: number): Promise<GetByIdClienteDTO | null>;

  // --- Operaciones de Validación ---

  /** Busca coincidencia por documento para evitar duplicidad */
  findByDocumento(numero_documento: string): Promise<{ id: number } | null>;

  /** Busca coincidencia por correo para evitar duplicidad */
  findByCorreo(correo?: string | null): Promise<{ id: number } | null>;
}
