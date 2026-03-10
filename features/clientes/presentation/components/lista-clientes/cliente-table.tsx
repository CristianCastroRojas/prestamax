"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TipoDocumentoDTO } from "@/features/tipos-documentos";
import { CiudadDTO, DepartamentoDTO } from "@/features/ubicaciones";

interface DataTableProps<TData, TValue> {
  // Definición de las columnas de la tabla
  columns: ColumnDef<TData, TValue>[];
  // Datos que se mostrarán en las filas
  data: TData[];
}

export function ClienteTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Estado para manejar el ordenamiento de las columnas
  const [sorting, setSorting] = useState<SortingState>([]);

  // Configuración principal de la tabla utilizando TanStack Table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="hidden lg:block w-full overflow-hidden">
      {/* Contenedor con scroll horizontal y estilos de tarjeta para la tabla */}
      <div className="w-full overflow-x-auto border border-border rounded-xl bg-card shadow-sm">
        <Table className="min-w-full">
          {/* Cabecera de la tabla con soporte para ordenamiento al hacer clic */}
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-b"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground/80 cursor-pointer"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Cuerpo de la tabla con renderizado dinámico de filas y celdas */}
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group transition-colors data-[state=selected]:bg-muted hover:bg-muted/30 border-b border-border/50 last:border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap px-6 py-4 text-sm text-foreground/90 font-medium"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              /* Mensaje de retroalimentación cuando no hay datos */
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No hay resultados disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
