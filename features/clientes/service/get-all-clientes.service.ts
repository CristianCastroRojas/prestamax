import { GetAllClienteDTO } from "../dtos/get-all-clientes.dto";
import { PaginatedResponseDTO } from "../dtos/paginated-response.dto";
import { ClienteRepository } from "../repository/cliente.repository";

export const GetAllClienteService = {
  async execute(
    page: number,
    limit: number,
  ): Promise<PaginatedResponseDTO<GetAllClienteDTO>> {
    try {
      const { data, total } = await ClienteRepository.getAll(page, limit);

      return {
        data,
        meta: {
          total,
          page,
          limit,
          lastPage: Math.ceil(total / limit),
        },
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error inesperado";
      throw new Error(errorMessage);
    }
  },
};
