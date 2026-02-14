import { GetAllClienteDTO } from "../dtos/GetAllClienteDTO";
import { PaginatedResponseDTO } from "../dtos/PaginatedResponseDTO";
import { ClienteRepository } from "../repository/ClienteRepository";

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
