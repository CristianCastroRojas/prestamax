import { GetAllClienteUseCase as GetAllClienteService } from "@/features/clientes/application/use-cases/get-all-clientes.use-case";

import HeaderCliente from "@/features/clientes/presentation/components/header-cliente/header-cliente";
import {
  columns,
  ClienteTable,
} from "@/features/clientes/presentation/components/lista-clientes";
import { ClienteCardMobile } from "@/features/clientes/presentation/components/lista-clientes/cliente-card-mobile";
import { PaginationControls } from "@/features/clientes/presentation/components/pagination-controls/pagination-controls";

// Tipado de parámetros de búsqueda para compatibilidad con Next.js 15 (asíncrono)
type SearchParams = Promise<{ page?: string; limit?: string }>;

export default async function ClientesPage(props: {
  searchParams: SearchParams;
}) {
  // 1. Resolución de parámetros de la URL para paginación
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  // 2. Ejecución de fetch de datos de clientes
  const response = await GetAllClienteService.execute(page, limit);

  // 3. Extracción de la lista de clientes y metadatos de paginación
  const { data: clientes, meta } = response;

  return (
    <section className="w-full p-4">
      <div className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6">
        {/* Cabecera con acciones globales */}
        <HeaderCliente />

        <div className="w-full border rounded-lg bg-white shadow-sm overflow-hidden">
          {/* VISTA DESKTOP: Tabla optimizada para pantallas grandes */}
          <div className="hidden lg:block">
            <ClienteTable columns={columns} data={clientes} />
          </div>

          {/* VISTA MÓVIL: Lista de tarjetas para pantallas pequeñas */}
          <div className="lg:hidden p-4 space-y-4">
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <ClienteCardMobile key={cliente.id} cliente={cliente} />
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No hay clientes registrados.
              </div>
            )}
          </div>

          {/* Pie de tabla: Controles de navegación y estado de paginación */}
          <div className="border-t bg-gray-50/50 px-4">
            <PaginationControls meta={meta} />
          </div>
        </div>
      </div>
    </section>
  );
}
