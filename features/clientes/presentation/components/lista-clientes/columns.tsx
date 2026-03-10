"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatters/date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { GetAllClienteDTO } from "@/features/clientes/application/dtos/get-all-clientes.dto";
import { EditClienteSheet } from "../editar-cliente-sheet/editar-cliente-sheet";
import { DeleteClienteAction } from "../delete-cliente-action/delete-cliente-action";

// Alias para el tipo de datos que manejará la tabla de clientes
export type ClienteColumnsList = GetAllClienteDTO;

export const columns: ColumnDef<ClienteColumnsList>[] = [
  {
    // Columna de identificación nominal: concatena nombre y apellido
    header: "Nombre completo",
    accessorFn: (row) => `${row.nombre} ${row.apellido}`,
    enableSorting: true,
    sortingFn: "alphanumeric",
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground tracking-tight">
        {getValue() as string}
      </span>
    ),
  },
  {
    // Visualización del documento: incluye el tipo y el número
    header: "Documento",
    accessorFn: (row) => row.numero_documento,
    enableSorting: true,
    sortingFn: "alphanumeric",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
          {row.original.tipoDocumento}
        </span>
        <span className="text-[12px] text-muted-foreground font-medium">
          {row.original.numero_documento}
        </span>
      </div>
    ),
  },
  {
    // Estado de cuenta: muestra Badge dinámico según valor booleano
    header: "Estado",
    accessorKey: "estado",
    enableSorting: true,
    sortingFn: "basic",
    cell: ({ row }) => {
      const isActivo = row.original.estado;
      return (
        <Badge
          variant={isActivo ? "default" : "secondary"}
          className={cn(
            "px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight",
            !isActivo && "bg-muted text-muted-foreground border-transparent",
          )}
        >
          {isActivo ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
  {
    // Ubicación geográfica simplificada del cliente
    header: "Ciudad",
    accessorKey: "ciudad",
    enableSorting: true,
    sortingFn: "alphanumeric",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-foreground/80">
          {row.original.ciudad}
        </span>
      </div>
    ),
  },
  {
    // Fecha de creación con formateo personalizado y soporte de ordenamiento
    header: "Fecha de Registro",
    accessorKey: "created_at",
    enableSorting: true,
    sortingFn: "datetime",
    cell: ({ row }) => {
      const date = row.original.created_at;
      if (!date) return <span className="text-muted-foreground">-</span>;

      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 opacity-70" />
          <span className="text-sm font-medium">{formatDate(date)}</span>
        </div>
      );
    },
  },
  {
    // Grupo de acciones: Ver detalle, Editar (vía Sheet) y Eliminar
    id: "acciones",
    header: () => <div className="text-right">Acciones</div>,
    enableSorting: false,
    cell: ({ row, table }) => {
      const cliente = row.original;
      const meta = table.options.meta as any;

      return (
        <div className="flex items-center justify-end gap-1">
          {/* Navegación al perfil detallado del cliente */}
          <Link href={`/clientes/${cliente.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              title="Ver detalle"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>

          {/* Componente lateral para edición */}
          <EditClienteSheet cliente={cliente} />

          {/* Acción directa de borrado con diálogo de confirmación */}
          <DeleteClienteAction
            clientId={cliente.id}
            clientName={`${cliente.nombre} ${cliente.apellido}`}
          />
        </div>
      );
    },
  },
];
