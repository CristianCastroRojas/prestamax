"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TipoDocumentoDTO } from "@/features/tipos-documentos";
import { CiudadDTO, DepartamentoDTO } from "@/features/ubicaciones";
import { NuevoClienteSheet } from "../nuevo-cliente-sheet";

interface Props {}

export function NuevoClienteTrigger({}: Props) {
  // Estado local para controlar la apertura del modal/sheet de creación
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón principal de acción con estilos de énfasis y feedback táctil */}
      <Button
        onClick={() => setOpen(true)}
        className="w-full gap-2 sm:w-auto font-semibold shadow-sm transition-all hover:shadow-md active:scale-95"
      >
        {/* Icono con trazo grueso para reforzar la jerarquía visual de 'crear' */}
        <Plus className="h-4 w-4 stroke-[3px]" />
        Agregar cliente
      </Button>

      {/* Componente que renderiza el formulario lateral (Sheet) */}
      <NuevoClienteSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
