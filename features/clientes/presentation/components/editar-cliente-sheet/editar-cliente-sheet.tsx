"use client";

import { useState } from "react";
import { Edit, UserCog } from "lucide-react";

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
import { ClienteForm } from "../cliente-form/cliente-form";

interface EditClienteSheetProps {
  // Datos actuales del cliente para precargar en el formulario
  cliente: UpdateClienteDTO & { id_departamento: number };
}

export function EditClienteSheet({ cliente }: EditClienteSheetProps) {
  // Controla la apertura y cierre del panel lateral (Sheet)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {/* Disparador: Botón de edición con estilo minimalista */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
          title="Editar información"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col p-0 sm:max-w-[600px] border-l-primary/20 shadow-2xl">
        {/* Encabezado del panel lateral con branding suave */}
        <SheetHeader className="px-6 py-5 bg-primary/5 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg shadow-md">
              <UserCog className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <SheetTitle className="text-xl font-bold text-gray-900 tracking-tight">
                Editar Perfil del Cliente
              </SheetTitle>
              <p className="text-xs text-muted-foreground font-medium">
                Modifique los datos necesarios y guarde los cambios.
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* Contenedor con scroll para alojar el formulario de edición */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ClienteForm cliente={cliente} onSuccess={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
