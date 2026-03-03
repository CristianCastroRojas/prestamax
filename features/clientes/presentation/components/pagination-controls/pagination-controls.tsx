"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, ListOrdered } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

interface Props {
  // Metadatos de paginación provenientes de la API
  meta: {
    total: number;
    page: number;
    lastPage: number;
    last_page?: number; // Soporte para diferentes formatos de respuesta
    limit: number;
  };
}

export function PaginationControls({ meta }: Props) {
  const page = meta.page;
  // Normalización de la última página según el DTO recibido
  const lastPage = meta.lastPage ?? meta.last_page ?? 1;

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-2 py-4 sm:flex-row">
      {/* Texto informativo del estado actual de la lista y total de registros */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ListOrdered className="h-4 w-4 opacity-70" />
        <p>
          Mostrando página{" "}
          <span className="font-semibold text-foreground">{page}</span> de{" "}
          <span className="font-semibold text-foreground">{lastPage}</span> (
          {meta.total} registros)
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Pagination>
          <PaginationContent className="gap-2">
            {/* Control de navegación hacia la página anterior */}
            <PaginationItem>
              <Link
                href={`/clientes?page=${page - 1}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1 h-9 transition-all active:scale-95",
                  page <= 1 && "pointer-events-none opacity-50 bg-muted",
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Link>
            </PaginationItem>

            {/* Control de navegación hacia la página siguiente */}
            <PaginationItem>
              <Link
                href={`/clientes?page=${page + 1}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1 h-9 transition-all active:scale-95",
                  page >= lastPage && "pointer-events-none opacity-50 bg-muted",
                )}
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
