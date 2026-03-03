"use client";

import { useState } from "react";
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

import { UpdateClienteDTO } from "@/features/clientes/application/dtos/update-cliente.dto";
import { TipoDocumentoDTO } from "@/features/tipos-documentos";
import { CiudadDTO, DepartamentoDTO } from "@/features/ubicaciones";
import { EditarClienteForm } from "../editar-cliente-form/editar-cliente-form";

interface EditClienteSheetProps {
  // Datos actuales del cliente para precargar en el formulario
  cliente: UpdateClienteDTO & { id_departamento: number };
  // Lista de tipos de identificación para el selector
  tiposDocumento: TipoDocumentoDTO[];
  // Lista de departamentos para la selección geográfica
  departamentos: DepartamentoDTO[];
  // Lista de ciudades que se filtrarán por departamento
  ciudades: CiudadDTO[];
}

export function EditClienteSheet({
  cliente,
  tiposDocumento,
  departamentos,
  ciudades,
}: EditClienteSheetProps) {
  // Controla la apertura y cierre del panel lateral (Sheet)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Botón disparador que abre el panel de edición */}
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

      {/* Contenido del panel lateral con scroll independiente */}
      <SheetContent className="flex flex-col h-full w-full p-0 sm:max-w-lg border-l border-border shadow-2xl">
        {/* Cabecera con título y descripción dinámica del cliente */}
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

        {/* Contenedor del formulario con manejo de cierre tras éxito */}
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
