"use client";

import { useEffect, useMemo, useState } from "react";
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
import {
  DepartamentoDTO,
  CiudadDTO,
} from "../../application/dtos/ubicacion.dto";

interface UbicacionSelectsProps {
  departamentos: DepartamentoDTO[]; // Lista maestra de departamentos
  ciudades: CiudadDTO[]; // Lista maestra de ciudades (trae id_departamento)
  loading?: boolean; // Estado de carga desde la API
}

/**
 * UbicacionSelects: Componente inteligente para la selección jerárquica.
 * Maneja la lógica de filtrado de ciudades según el departamento elegido
 * y la autoselección de valores únicos para mejorar la UX.
 */
export function UbicacionSelects({
  departamentos,
  ciudades,
  loading = false,
}: UbicacionSelectsProps) {
  // Extraemos funciones de react-hook-form del contexto del formulario padre
  const { control, watch, setValue, getValues } = useFormContext();
  const [isMounted, setIsMounted] = useState(false);

  // 'watch' observa cambios en tiempo real en el campo 'id_departamento'
  const deptoSeleccionado = watch("id_departamento");

  /**
   * FILTRADO REACTIVO:
   * Usamos useMemo para filtrar las ciudades cada vez que cambie el departamento.
   * Esto evita cálculos innecesarios en cada renderizado.
   */
  const ciudadesFiltradas = useMemo(() => {
    return ciudades.filter(
      (c) => Number(c.id_departamento) === Number(deptoSeleccionado),
    );
  }, [ciudades, deptoSeleccionado]);

  // Evitamos errores de hidratación en Next.js (SSR vs Client)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * LÓGICA DE NEGOCIO AUTOMATIZADA:
   * Este efecto ayuda al usuario a llenar el formulario más rápido.
   */
  useEffect(() => {
    if (!isMounted || loading) return;

    // REGLA 1: Si solo existe un departamento disponible, lo seleccionamos automáticamente.
    if (departamentos.length === 1) {
      const unicoDeptoId = Number(departamentos[0].id_departamento);
      if (Number(getValues("id_departamento")) !== unicoDeptoId) {
        setValue("id_departamento", unicoDeptoId, { shouldValidate: true });
      }
    }

    // REGLA 2: Si al filtrar ciudades solo queda una, la seleccionamos automáticamente.
    if (ciudadesFiltradas.length === 1) {
      const unicaCiudadId = Number(ciudadesFiltradas[0].id_ciudad);
      if (Number(getValues("id_ciudad")) !== unicaCiudadId) {
        setValue("id_ciudad", unicaCiudadId, { shouldValidate: true });
      }
    } else if (Number(getValues("id_ciudad")) !== 0) {
      // LIMPIEZA: Si el depto cambia y la ciudad actual ya no pertenece a ese depto, reseteamos a 0.
      const esValida = ciudadesFiltradas.some(
        (c) => Number(c.id_ciudad) === Number(getValues("id_ciudad")),
      );
      if (!esValida) {
        setValue("id_ciudad", 0);
      }
    }
  }, [
    isMounted,
    departamentos,
    ciudadesFiltradas,
    loading,
    setValue,
    getValues,
  ]);

  // Si no está montado en el cliente, no renderizamos nada (evita parpadeos de UI)
  if (!isMounted) return null;

  return (
    <>
      {/* --- SELECTOR DE DEPARTAMENTO --- */}
      <FormField
        control={control}
        name="id_departamento"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
              Departamento *
            </FormLabel>
            <Select
              // La key fuerza el re-render si el valor cambia externamente
              key={`depto-${field.value}`}
              onValueChange={(v) => field.onChange(Number(v))}
              value={field.value ? field.value.toString() : ""}
              // Deshabilitamos si está cargando o si solo hay una opción (ya autoseleccionada)
              disabled={departamentos.length <= 1 || loading}
            >
              <FormControl>
                <SelectTrigger className="bg-background w-full">
                  <SelectValue placeholder="Seleccionar dpto..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {departamentos.map((d) => (
                  <SelectItem
                    key={d.id_departamento}
                    value={d.id_departamento.toString()}
                  >
                    {d.nombre_departamento}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-[11px]" />
          </FormItem>
        )}
      />

      {/* --- SELECTOR DE CIUDAD --- */}
      <FormField
        control={control}
        name="id_ciudad"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
              Ciudad *
            </FormLabel>
            <Select
              // La key incluye deptoSeleccionado para resetear visualmente el select al cambiar de dpto
              key={`ciudad-${field.value}-${deptoSeleccionado}`}
              onValueChange={(v) => field.onChange(Number(v))}
              value={field.value ? field.value.toString() : ""}
              disabled={
                !Number(deptoSeleccionado) || // Bloqueado si no hay departamento
                ciudadesFiltradas.length <= 1 || // Bloqueado si hay opción única
                loading
              }
            >
              <FormControl>
                <SelectTrigger className="bg-background w-full">
                  <SelectValue placeholder="Seleccionar ciudad..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ciudadesFiltradas.map((c) => (
                  <SelectItem key={c.id_ciudad} value={c.id_ciudad.toString()}>
                    {c.nombre_ciudad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-[11px]" />
          </FormItem>
        )}
      />
    </>
  );
}
