"use client";

import { useEffect, useState } from "react";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save, Eraser, User, Mail, MapPin, CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator"; // Componente shadcn
import {
  CreateClienteInput,
  createClienteSchema,
} from "../../schemas/createcliente.schema";
import { TipoDocumentoDTO } from "../../repository/TipoDocumentoRepository";
import {
  CiudadDTO,
  DepartamentoDTO,
} from "../../repository/UbicacionRepository";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/api";
import { createCliente } from "../../data/createCliente";

interface Props {
  onSuccess?: () => void;
  tiposDocumento: TipoDocumentoDTO[];
  departamentos: DepartamentoDTO[];
  ciudades: CiudadDTO[];
}

export function NuevoClienteForm({
  onSuccess,
  tiposDocumento,
  departamentos,
  ciudades,
}: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateClienteInput>({
    resolver: zodResolver(createClienteSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      numero_documento: "",
      correo: "",
      fecha_nacimiento: "",
      telefono: "",
      direccion: "",
      barrio: "",
      estado: true,
      id_tipo_documento: 0,
      id_ciudad: 0,
      id_departamento: 0,
    },
  });

  const deptoSeleccionado = form.watch("id_departamento");
  const ciudadesFiltradas = ciudades.filter(
    (c) => c.id_departamento === deptoSeleccionado,
  );

  useEffect(() => {
    form.setValue("id_ciudad", 0);
  }, [deptoSeleccionado, form]);

  const router = useRouter();

  const onSubmit = async (values: CreateClienteInput) => {
    setLoading(true);
    const toastId = toast.loading("Registrando cliente...");

    try {
      const result = await createCliente(values);

      toast.success("Completado", {
        description: result.message ?? "Guardado correctamente",
        id: toastId,
      });

      form.reset();
      router.refresh();
      onSuccess?.();
    } catch (error: any) {
      if (error.status === 409) {
        return toast.warning("Dato duplicado", {
          description: error.message,
          id: toastId,
        });
      }

      if (error.status === 400 && Array.isArray(error.issues)) {
        error.issues.forEach((issue: { campo: string; mensaje: string }) => {
          form.setError(issue.campo as Path<CreateClienteInput>, {
            message: issue.mensaje,
          });
        });

        return toast.error("Validación fallida", {
          description: "Revisa los campos marcados",
          id: toastId,
        });
      }

      toast.error("Error", {
        description: error.message ?? "No se pudo conectar con el servidor",
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-4 pb-8 pt-2"
      >
        {/* --- SECCIÓN: INFORMACIÓN PERSONAL --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
            <User className="h-4 w-4" />
            Información Personal
          </div>
          <Separator className="bg-border/60" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Nombre *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Juan"
                      className="bg-background focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Apellido *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Pérez"
                      className="bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_tipo_documento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Tipo de Documento *
                  </FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={
                      field.value !== 0 ? field.value?.toString() : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Seleccionar tipo..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tiposDocumento.map((tipo) => (
                        <SelectItem
                          key={tipo.id_tipo_documento}
                          value={tipo.id_tipo_documento.toString()}
                        >
                          {tipo.nombre_tipo_documento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numero_documento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Número de Documento *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12345678"
                      className="bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fecha_nacimiento"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-1">
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80 mb-1">
                    Fecha de nacimiento
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between font-normal bg-background hover:bg-muted/50 transition-colors"
                      >
                        {field.value ? (
                          new Date(field.value).toLocaleDateString()
                        ) : (
                          <span className="text-muted-foreground">
                            Seleccionar
                          </span>
                        )}
                        <CalendarIcon className="h-4 w-4 opacity-50 text-primary" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        onSelect={(d) => field.onChange(d?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* --- SECCIÓN: CONTACTO Y UBICACIÓN --- */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
            <Mail className="h-4 w-4" />
            Contacto y Ubicación
          </div>
          <Separator className="bg-border/60" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Correo Electrónico *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="juan@correo.com"
                      className="bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Teléfono *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="3001234567"
                      className="bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Departamento *
                  </FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Ciudad *
                  </FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={
                      field.value && field.value !== 0
                        ? field.value.toString()
                        : ""
                    }
                    disabled={
                      !deptoSeleccionado || ciudadesFiltradas.length === 0
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Seleccionar ciudad..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ciudadesFiltradas.map((c) => (
                        <SelectItem
                          key={c.id_ciudad}
                          value={c.id_ciudad.toString()}
                        >
                          {c.nombre_ciudad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barrio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Barrio *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: La Floresta"
                      className="bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground/80">
                    Dirección *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Calle 1 #2-3"
                      className="bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* --- ACCIONES --- */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            type="submit"
            className="flex-1 order-2 sm:order-1 font-bold shadow-sm"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">Cargando...</span>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cliente
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex-1 order-1 sm:order-2 border-dashed hover:bg-destructive/5 hover:text-destructive hover:border-destructive transition-all"
            onClick={() => form.reset()}
            disabled={loading}
          >
            <Eraser className="mr-2 h-4 w-4" />
            Limpiar
          </Button>
        </div>
      </form>
    </Form>
  );
}
