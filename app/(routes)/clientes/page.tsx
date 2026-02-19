import HeaderCliente from "@/features/clientes/components/header-cliente/header-cliente";
import {
  columns,
  ClienteTable,
} from "@/features/clientes/components/lista-clientes";
import { ClienteCardMobile } from "@/features/clientes/components/lista-clientes/cliente-card-mobile";
import { PaginationControls } from "@/features/clientes/components/pagination-controls/pagination-controls";
import { GetTipoDocumentosService } from "@/features/clientes/repository/tipo-documento.repository";

import { GetAllClienteService } from "@/features/clientes/service/get-all-clientes.service";
import { GetUbicacionesService } from "@/features/ubicaciones";

// Tipado de props para Next.js 15
type SearchParams = Promise<{ page?: string; limit?: string }>;

export default async function ClientesPage(props: {
  searchParams: SearchParams;
}) {
  // 1. Esperamos los searchParams
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  // 2. Fetch de datos en paralelo
  const [tiposDocumento, { departamentos, ciudades }, response] =
    await Promise.all([
      GetTipoDocumentosService.execute(),
      GetUbicacionesService.execute(),
      GetAllClienteService.execute(page, limit),
    ]);

  // 3. Desestructuramos la respuesta (Aquí ya usamos 'meta', adiós al error)
  const { data: clientes, meta } = response;

  return (
    <section className="w-full p-4">
      <div className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6">
        <HeaderCliente
          tiposDocumento={tiposDocumento}
          departamentos={departamentos}
          ciudades={ciudades}
        />

        <div className="w-full border rounded-lg bg-white shadow-sm overflow-hidden">
          {/* VISTA DESKTOP */}
          <div className="hidden lg:block">
            <ClienteTable
              columns={columns}
              data={clientes}
              tiposDocumento={tiposDocumento}
              departamentos={departamentos}
              ciudades={ciudades}
            />
          </div>

          {/* VISTA MÓVIL */}
          <div className="lg:hidden p-4 space-y-4">
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <ClienteCardMobile
                  key={cliente.id}
                  cliente={cliente}
                  tiposDocumento={tiposDocumento}
                  departamentos={departamentos}
                  ciudades={ciudades}
                />
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No hay clientes registrados.
              </div>
            )}
          </div>

          {/* CONTROL DE PAGINACIÓN (Usa 'meta' aquí) */}
          <div className="border-t bg-gray-50/50 px-4">
            <PaginationControls meta={meta} />
          </div>
        </div>
      </div>
    </section>
  );
}
