"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NuevoClienteSheet } from "../nuevo-cliente-sheet";
import { TipoDocumentoDTO } from "../../repository/tipo-documento.repository";
import { CiudadDTO, DepartamentoDTO } from "@/features/ubicaciones";


interface Props {
  tiposDocumento: TipoDocumentoDTO[];
  departamentos: DepartamentoDTO[];
  ciudades: CiudadDTO[];
}

export function NuevoClienteTrigger({
  tiposDocumento,
  departamentos,
  ciudades,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        // Mejoras: sombra sutil, transición suave y fuentes más definidas
        className="w-full gap-2 sm:w-auto font-semibold shadow-sm transition-all hover:shadow-md active:scale-95"
      >
        <Plus className="h-4 w-4 stroke-[3px]" />{" "}
        {/* Icono un poco más grueso para mejor visibilidad */}
        Agregar cliente
      </Button>

      <NuevoClienteSheet
        open={open}
        onClose={() => setOpen(false)}
        tiposDocumento={tiposDocumento}
        departamentos={departamentos}
        ciudades={ciudades}
      />
    </>
  );
}
