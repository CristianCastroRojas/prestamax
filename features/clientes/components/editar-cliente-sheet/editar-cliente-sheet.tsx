"use client";

import React, { useState } from "react";
import { Edit } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UpdateClienteDTO } from "../../dtos/update-cliente.dto";
import { EditarClienteForm } from "../editar-cliente-form/editar-cliente-form";
import { TipoDocumentoDTO } from "../../repository/tipo-documento.repository";
import { CiudadDTO, DepartamentoDTO } from "@/features/ubicaciones";


interface EditClienteSheetProps {
  cliente: UpdateClienteDTO;
  tiposDocumento: TipoDocumentoDTO[];
  departamentos: DepartamentoDTO[];
  ciudades: CiudadDTO[];
}

export function EditClienteSheet({
  cliente,
  tiposDocumento,
  departamentos,
  ciudades,
}: EditClienteSheetProps) {
  // Manejamos el estado localmente para que el botón funcione de forma independiente
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
          title="Editar cliente"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col h-full w-full p-0 sm:max-w-lg border-l border-border shadow-2xl">
        <SheetHeader className="px-6 py-6 border-b border-border bg-muted/20">
          <SheetTitle className="text-xl font-bold tracking-tight text-foreground">
            Editar Información
          </SheetTitle>
          <SheetDescription>
            Actualiza o modifica la información del cliente. Los campos con *
            son obligatorios.{" "}
            <span className="font-semibold text-foreground">
              {cliente.nombre} {cliente.apellido}
            </span>
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <EditarClienteForm
            cliente={cliente}
            onSuccess={() => setIsOpen(false)}
            tiposDocumento={tiposDocumento}
            departamentos={departamentos}
            ciudades={ciudades}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
