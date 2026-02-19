"use client";

import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, ListOrdered } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  meta: {
    total: number;
    page: number;
    lastPage: number;
    last_page?: number;
    limit: number;
  };
}

export function PaginationControls({ meta }: Props) {
  const page = meta.page;
  const lastPage = meta.lastPage ?? meta.last_page ?? 1;

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-2 py-4 sm:flex-row">
      {/* Texto informativo */}
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
            {/* Anterior */}
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

            {/* Siguiente */}
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
