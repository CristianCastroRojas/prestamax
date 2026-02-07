import { GetAllClienteDTO } from "../DTOs/GetAllClienteDTO";
import { PaginatedResponseDTO } from "../DTOs/PaginatedResponseDTO";
import { ClienteRepository } from "../Repository/ClienteRepository";

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
