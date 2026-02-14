"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, FileText, MapPin, Calendar, Eye, Edit } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
// Importamos tu componente de borrado
import { cn } from "@/lib/utils";
import { DeleteClienteAction } from "../DeleteClienteAction/DeleteClienteAction";
import { ClienteColumnsList } from "./columns";
import { EditClienteSheet } from "../EditarClienteSheet/EditarClienteSheet";
import { TipoDocumentoDTO } from "../../repository/TipoDocumentoRepository";
import {
  CiudadDTO,
  DepartamentoDTO,
} from "../../repository/UbicacionRepository";

interface ClienteCardMobileProps {
  cliente: ClienteColumnsList;
  tiposDocumento: TipoDocumentoDTO[];
  departamentos: DepartamentoDTO[];
  ciudades: CiudadDTO[];
}

export function ClienteCardMobile({
  cliente,
  tiposDocumento,
  departamentos,
  ciudades,
}: ClienteCardMobileProps) {
  const estado = cliente.estado ? "Activo" : "Inactivo";

  return (
    <Card className="lg:hidden border-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none text-foreground">
                {cliente.nombre} {cliente.apellido}
              </span>
              <div className="mt-1.5">
                <Badge
                  variant={cliente.estado ? "default" : "secondary"}
                  className={cn(
                    "px-2 py-0 text-[10px] uppercase tracking-wider font-bold",
                    !cliente.estado &&
                      "bg-muted text-muted-foreground border-none",
                  )}
                >
                  {estado}
                </Badge>
              </div>
            </div>
          </div>

          {/* ID sutil en la esquina */}
          <span className="text-[10px] font-mono text-muted-foreground">
            #{cliente.id}
          </span>
        </div>
      </CardHeader>

      <div className="mx-4 border-t border-border/50" />

      <CardContent className="p-4 space-y-4">
        {/* Grid de información principal */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                Documento
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[12px] font-semibold text-foreground">
                {cliente.tipoDocumento}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {cliente.numero_documento}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                Ubicación
              </span>
            </div>
            <span className="text-[12px] font-semibold text-foreground truncate">
              {cliente.ciudad}
            </span>
          </div>
        </div>

        {/* Footer de la Card: Acciones */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-[11px]">
              {cliente.created_at
                ? new Date(cliente.created_at).toLocaleDateString()
                : "-"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Ver Detalle */}
            <Link
              href={`/clientes/${cliente.id}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-full",
              )}
            >
              <Eye className="h-4 w-4" />
            </Link>

            {/* Editar */}
            <EditClienteSheet
              cliente={cliente}
              tiposDocumento={tiposDocumento}
              departamentos={departamentos}
              ciudades={ciudades}
            />

            {/* Eliminar (Tu componente AlertDialog) */}
            <DeleteClienteAction
              clientId={cliente.id}
              clientName={`${cliente.nombre} ${cliente.apellido}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
