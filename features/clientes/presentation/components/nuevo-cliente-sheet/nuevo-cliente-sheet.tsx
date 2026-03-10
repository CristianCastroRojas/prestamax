"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { TipoDocumentoDTO } from "@/features/tipos-documentos";
import { CiudadDTO, DepartamentoDTO } from "@/features/ubicaciones";
import { NuevoClienteForm } from "../nuevo-cliente-form/nuevo-cliente-form";

type Props = {
  // Estado de visibilidad controlado desde el componente padre
  open: boolean;
  // Función para cerrar el panel lateral (Sheet)
  onClose: () => void;
};

export function NuevoClienteSheet({ open, onClose }: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      {/* Panel lateral con scroll interno y diseño consistente con la edición */}
      <SheetContent className="flex flex-col h-full w-full p-0 sm:max-w-lg border-l border-border shadow-2xl">
        {/* Cabecera descriptiva para la creación de nuevos registros */}
        <SheetHeader className="px-6 py-6 border-b border-border bg-muted/20">
          <SheetTitle className="text-xl font-bold tracking-tight text-foreground">
            Agregar cliente
          </SheetTitle>
          <SheetDescription className="text-sm leading-relaxed text-muted-foreground">
            Completa la información del cliente. Los campos con * son
            obligatorios.
          </SheetDescription>
        </SheetHeader>

        {/* Contenedor del formulario con scroll independiente para formularios largos */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <NuevoClienteForm onSuccess={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
