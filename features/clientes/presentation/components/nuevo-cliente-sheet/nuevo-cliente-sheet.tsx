"use client";

import { UserPlus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ClienteForm } from "../cliente-form/cliente-form";

type Props = {
  // Estado de visibilidad controlado desde el componente padre
  open: boolean;
  // Función para cerrar el panel lateral (Sheet)
  onClose: () => void;
};

export function NuevoClienteSheet({ open, onClose }: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col p-0 sm:max-w-[600px] border-l-primary/20 shadow-2xl">
        <SheetHeader className="px-6 py-5 bg-primary/5 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg shadow-md">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <SheetTitle className="text-xl font-bold text-gray-900 tracking-tight">
                Registrar Nuevo Cliente
              </SheetTitle>
              <p className="text-xs text-muted-foreground font-medium">
                Complete los campos para dar de alta un cliente en el sistema.
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* Contenedor del formulario con scroll independiente para formularios largos */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ClienteForm onSuccess={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
