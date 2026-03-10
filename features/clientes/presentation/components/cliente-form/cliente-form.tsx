"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { es } from "date-fns/locale";
import {
  Save,
  Eraser,
  User,
  Mail,
  CalendarIcon,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { UpdateClienteDTO } from "@/features/clientes/application/dtos/update-cliente.dto";
import {
  CreateClienteInput,
  createClienteSchema,
} from "@/features/clientes/infrastructure/validation/create-cliente.schema";
import { createCliente } from "@/features/clientes/infrastructure/http/create-cliente.api";
import { updateCliente } from "@/features/clientes/infrastructure/http/update-cliente.api";
import {
  useTiposDocumentos,
  TipoDocumentoSelect,
} from "@/features/tipos-documentos";
import { useUbicaciones, UbicacionSelects } from "@/features/ubicaciones";

interface ClienteFormProps {
  // Si se proporciona, el formulario está en modo EDICIÓN
  cliente?: UpdateClienteDTO & { id_departamento: number };
  // Callback opcional tras éxito
  onSuccess?: () => void;
}

export function ClienteForm({ cliente, onSuccess }: ClienteFormProps) {
  const isEditMode = !!cliente;
  const router = useRouter();

  // Hooks de React Query para datos maestros
  const { data: tiposDocumento = [], isLoading: loadingTipos } =
    useTiposDocumentos();
  const { data: ubicaciones, isLoading: loadingUbicaciones } = useUbicaciones();

  const departamentos = ubicaciones?.departamentos ?? [];
  const ciudades = ubicaciones?.ciudades ?? [];

  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Configuración del formulario
  const form = useForm<CreateClienteInput>({
    resolver: zodResolver(createClienteSchema),
    defaultValues: {
      nombre: cliente?.nombre ?? "",
      apellido: cliente?.apellido ?? "",
      numero_documento: cliente?.numero_documento ?? "",
      correo: cliente?.correo ?? "",
      fecha_nacimiento: cliente?.fecha_nacimiento ?? "",
      telefono: cliente?.telefono ?? "",
      direccion: cliente?.direccion ?? "",
      barrio: cliente?.barrio ?? "",
      estado: cliente?.estado ?? true,
      id_tipo_documento: cliente?.id_tipo_documento ?? 0,
      id_ciudad: cliente?.id_ciudad ?? 0,
      id_departamento: cliente?.id_departamento ?? 0,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onSubmit = async (values: CreateClienteInput) => {
    setLoading(true);
    const actionLabel = isEditMode ? "Actualizando" : "Registrando";
    const toastId = toast.loading(`${actionLabel} cliente...`);

    try {
      if (isEditMode && cliente) {
        const result = await updateCliente(cliente.id, values);
        toast.success("Actualizado", {
          description:
            result.message ?? "Información actualizada correctamente",
          id: toastId,
        });
      } else {
        const result = await createCliente(values);
        toast.success("Completado", {
          description: result.message ?? "Guardado correctamente",
          id: toastId,
        });
        form.reset();
      }

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
        {/* --- SECCIÓN: ESTADO DEL CLIENTE (Solo en Edición) --- */}
        {isEditMode && (
          <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Estado de la cuenta
                    </FormLabel>
                    <FormDescription className="text-xs">
                      Define si el cliente está activo para realizar
                      operaciones.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

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

            <TipoDocumentoSelect
              tiposDocumento={tiposDocumento}
              loading={loading || loadingTipos}
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
                          new Date(field.value).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
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
                        locale={es}
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) => field.onChange(d?.toISOString())}
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
                    Correo Electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="juan@correo.com"
                      className="bg-background"
                      {...field}
                      value={field.value ?? ""}
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

            <UbicacionSelects
              departamentos={departamentos}
              ciudades={ciudades}
              loading={loading || loadingUbicaciones}
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

        {/* --- SECCIÓN DE ACCIONES FINAL --- */}
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
                {isEditMode ? "Actualizar Cliente" : "Guardar Cliente"}
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
            {isEditMode ? "Restaurar" : "Limpiar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
