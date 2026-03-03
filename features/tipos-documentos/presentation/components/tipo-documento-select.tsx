"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TipoDocumentoDTO } from "../../application/dtos/tipo-documento.dto";

interface TipoDocumentoSelectProps {
  tiposDocumento: TipoDocumentoDTO[]; // Datos traídos desde el UseCase
  loading?: boolean; // Estado visual de carga
}

/**
 * TipoDocumentoSelect: Selector especializado para la identificación.
 * Implementa la conversión automática de String a Number para mantener
 * la integridad de los tipos de datos en el backend.
 */
export function TipoDocumentoSelect({
  tiposDocumento,
  loading = false,
}: TipoDocumentoSelectProps) {
  // Obtenemos el control del formulario padre (FormProvider)
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="id_tipo_documento" // Nombre del campo en el esquema Zod
      render={({ field }) => (
        <FormItem>
          {/* Label estilizado con look profesional (Windows Admin Style) */}
          <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
            Tipo de Documento *
          </FormLabel>

          <Select
            // CONVERSIÓN: shadcn/ui usa strings, pero nuestra DB usa Number.
            // Aquí capturamos el string 'v' y lo pasamos al form como número.
            onValueChange={(v) => field.onChange(Number(v))}
            // Controlamos que no se muestre "0" si el valor es el inicial por defecto
            value={field.value !== 0 ? field.value?.toString() : ""}
            disabled={loading}
          >
            <FormControl>
              {/* min-w-0 y overflow-hidden evitan que el texto largo rompa el layout */}
              <SelectTrigger className="bg-background w-full min-w-0 overflow-hidden text-left">
                <SelectValue placeholder="Seleccionar tipo..." />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {tiposDocumento.map((tipo) => (
                <SelectItem
                  key={tipo.id_tipo_documento}
                  value={tipo.id_tipo_documento.toString()}
                >
                  {/* Ej: "Cédula de Ciudadanía", "NIT", etc. */}
                  {tipo.nombre_tipo_documento}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Espacio reservado para el error de validación de Zod */}
          <FormMessage className="text-[11px]" />
        </FormItem>
      )}
    />
  );
}
