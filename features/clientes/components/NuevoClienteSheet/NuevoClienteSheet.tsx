"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NuevoClienteForm } from "../NuevoClienteForm";
import { TipoDocumentoDTO } from "../../repository/TipoDocumentoRepository";
import {
  CiudadDTO,
  DepartamentoDTO,
} from "../../repository/UbicacionRepository";

type Props = {
  open: boolean;
  onClose: () => void;
  tiposDocumento: TipoDocumentoDTO[];
  departamentos: DepartamentoDTO[];
  ciudades: CiudadDTO[];
};

export function NuevoClienteSheet({
  open,
  onClose,
  tiposDocumento,
  departamentos,
  ciudades,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col h-full w-full p-0 sm:max-w-lg border-l border-border shadow-2xl">
        <SheetHeader className="px-6 py-6 border-b border-border bg-muted/20">
          <SheetTitle className="text-xl font-bold tracking-tight text-foreground">
            Agregar cliente
          </SheetTitle>
          <SheetDescription className="text-sm leading-relaxed text-muted-foreground">
            Completa la información del cliente. Los campos con * son
            obligatorios.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <NuevoClienteForm
            onSuccess={onClose}
            tiposDocumento={tiposDocumento}
            departamentos={departamentos}
            ciudades={ciudades}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
