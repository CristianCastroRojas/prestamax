import { Users } from "lucide-react";
import { TipoDocumentoDTO } from "../../Repository/TipoDocumentoRepository";
import {
  CiudadDTO,
  DepartamentoDTO,
} from "../../Repository/UbicacionRepository";
import { NuevoClienteTrigger } from "../NuevoClienteTrigger";

interface Props {
  tiposDocumento: TipoDocumentoDTO[];
  departamentos: DepartamentoDTO[];
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
        {/* Icono de sección para dar jerarquía visual */}
        <div className="hidden rounded-full bg-primary/10 p-3 text-primary lg:block">
          <Users className="h-6 w-6" />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-foreground">
            Gestión de Clientes
          </h1>
          <p className="text-sm text-muted-foreground">
            Aquí puedes ver la lista de clientes y administrar su información.
          </p>
        </div>
      </div>

      {/* Contenedor del botón para asegurar que en móvil ocupe el ancho necesario o se alinee */}
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
