import { Users } from "lucide-react";

import { TipoDocumentoDTO } from "@/features/tipos-documentos";
import { CiudadDTO, DepartamentoDTO } from "@/features/ubicaciones";

import { NuevoClienteTrigger } from "../nuevo-cliente-trigger";

interface Props {
  // Lista de tipos de identificación para el selector de nuevo cliente
  tiposDocumento: TipoDocumentoDTO[];
  // Lista de departamentos para la selección geográfica inicial
  departamentos: DepartamentoDTO[];
  // Lista maestra de ciudades para el formulario de registro
  ciudades: CiudadDTO[];
}

export default function HeaderCliente({
  tiposDocumento,
  departamentos,
  ciudades,
}: Props) {
  return (
    <header className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        {/* Icono de sección para dar jerarquía visual en pantallas grandes */}
        <div className="hidden rounded-full bg-primary/10 p-3 text-primary lg:block">
          <Users className="h-6 w-6" />
        </div>

        <div className="space-y-1">
          {/* Título principal de la sección de administración */}
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-foreground">
            Gestión de Clientes
          </h1>
          {/* Descripción contextual de las acciones disponibles */}
          <p className="text-sm text-muted-foreground">
            Aquí puedes ver la lista de clientes y administrar su información.
          </p>
        </div>
      </div>

      {/* Acceso directo para la creación de un nuevo registro de cliente */}
      <div className="flex items-center sm:shrink-0">
        <NuevoClienteTrigger
          tiposDocumento={tiposDocumento}
          departamentos={departamentos}
          ciudades={ciudades}
        />
      </div>
    </header>
  );
}
