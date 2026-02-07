"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetAllClienteDTO } from "../../DTOs/GetAllClienteDTO";
import { cn } from "@/lib/utils";
import { DeleteClienteAction } from "../DeleteClienteAction/DeleteClienteAction";
import Link from "next/link";
import { formatDate } from "@/lib/formatters/date";
import { EditClienteSheet } from "../EditarClienteSheet/EditarClienteSheet";

export const columns: ColumnDef<GetAllClienteDTO>[] = [
  {
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
    header: "Fecha de Registro",
    accessorKey: "created_at",
    enableSorting: true,
    sortingFn: "datetime",
    cell: ({ row }) => {
      const date = row.original.created_at;

      if (!date) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 opacity-70" />
          <span className="text-sm font-medium">{formatDate(date)}</span>
        </div>
      );
    },
  },
  {
    id: "acciones",
    header: () => <div className="text-right">Acciones</div>,
    enableSorting: false,
    cell: ({ row }) => {
      const cliente = row.original; // Extraemos el objeto cliente

      return (
        <div className="flex items-center justify-end gap-1">
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

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
            title="Editar"
            onClick={() => console.log("Editar:", cliente)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          {/* Inyectamos el componente con sus props */}
          <DeleteClienteAction
            clientId={cliente.id}
            clientName={`${cliente.nombre} ${cliente.apellido}`}
          />
        </div>
      );
    },
  },
];
