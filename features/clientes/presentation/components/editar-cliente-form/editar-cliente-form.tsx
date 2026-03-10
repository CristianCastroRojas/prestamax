"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { es } from "date-fns/locale";
import { toast } from "sonner";
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
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
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

import { UpdateClienteDTO } from "@/features/clientes/application/dtos/update-cliente.dto";
import { updateCliente } from "@/features/clientes/infrastructure/http/update-cliente.api";
import {
  UpdateClienteInput,
  updateClienteSchema,
} from "@/features/clientes/infrastructure/validation/update-cliente.schema";
import {
  useTiposDocumentos,
  TipoDocumentoSelect,
} from "@/features/tipos-documentos";
import { useUbicaciones, UbicacionSelects } from "@/features/ubicaciones";

interface Props {
  // Objeto que contiene los datos actuales del cliente que se van a modificar
  cliente: UpdateClienteDTO & { id_departamento: number };
  // Función opcional que se ejecuta tras actualizar el cliente con éxito
  onSuccess?: () => void;
}

export function EditarClienteForm({ cliente, onSuccess }: Props) {
  // Hooks de React Query para obtener datos con caché
  const { data: tiposDocumento = [], isLoading: loadingTipos } =
    useTiposDocumentos();
  const { data: ubicaciones, isLoading: loadingUbicaciones } = useUbicaciones();

  const departamentos = ubicaciones?.departamentos ?? [];
  const ciudades = ubicaciones?.ciudades ?? [];

  // Inicializa estados para el control de carga, montaje del componente y navegación
  // Inicializa estados para el control de carga, montaje del componente y navegación
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Configura el formulario con validación Zod y precarga los datos actuales del cliente
  const form = useForm<UpdateClienteInput>({
    resolver: zodResolver(updateClienteSchema),
    defaultValues: {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      numero_documento: cliente.numero_documento,
      correo: cliente.correo || "",
      fecha_nacimiento: cliente.fecha_nacimiento || "",
      telefono: cliente.telefono || "",
      direccion: cliente.direccion || "",
      barrio: cliente.barrio || "",
      estado: cliente.estado,
      id_tipo_documento: cliente.id_tipo_documento,
      id_ciudad: cliente.id_ciudad,
      id_departamento: cliente.id_departamento,
    },
  });

  // Confirma el montaje en el cliente para evitar errores de hidratación con Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (values: UpdateClienteInput) => {
    // Activa el estado de carga y muestra el mensaje de espera inicial
    setLoading(true);
    const toastId = toast.loading("Actualizando cliente...");

    try {
      // Envía los cambios a la API usando el ID del cliente y espera la respuesta
      const result = await updateCliente(cliente.id, values);

      // Muestra mensaje de éxito, actualiza la vista y ejecuta el callback de cierre
      toast.success("Actualizado", {
        description: result.message ?? "Información actualizada correctamente",
        id: toastId,
      });

      router.refresh();
      onSuccess?.();
    } catch (error: any) {
      // Si el status es 400 (Bad Request), mapea cada error del servidor al input correspondiente
      if (error.status === 400 && Array.isArray(error.issues)) {
        error.issues.forEach((issue: { campo: string; mensaje: string }) => {
          form.setError(issue.campo as Path<UpdateClienteInput>, {
            message: issue.mensaje,
          });
        });

        return toast.error("Validación fallida", {
          description: "Revisa los campos marcados",
          id: toastId,
        });
      }

      // Captura cualquier otro fallo (error 500, red, etc.) y muestra un aviso genérico
      toast.error("Error", {
        description: error.message ?? "No se pudo conectar con el servidor",
        id: toastId,
      });
    } finally {
      // Desactiva el estado de carga independientemente de si hubo éxito o error
      setLoading(false);
    }

    // Evita intentos de renderizado o procesos adicionales si el componente aún no está montado
    if (!isMounted) return null;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-4 pb-8 pt-2"
      >
        {/* --- SECCIÓN: ESTADO DEL CLIENTE (Toggle) --- */}
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
                    Define si el cliente está activo para realizar operaciones.
                  </FormDescription>
                </div>
                <FormControl>
                  {/* Interruptor para activar/desactivar el estado del cliente */}
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* --- SECCIÓN: INFORMACIÓN PERSONAL --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
            <User className="h-4 w-4" />
            Información Personal
          </div>
          <Separator className="bg-border/60" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Campo para el nombre del cliente */}
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

            {/* Campo para el apellido del cliente */}
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

            {/* Componente centralizado para selección de Tipo de Documento */}
            <TipoDocumentoSelect
              tiposDocumento={tiposDocumento}
              loading={loading || loadingTipos}
            />

            {/* Campo para el número de identificación */}
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

            {/* Selector de fecha de nacimiento mediante calendario Popover */}
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
            {/* Campo para el correo electrónico (opcional) */}
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
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            {/* Campo para el número telefónico de contacto */}
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

            {/* Componente centralizado para selección de Departamento y Ciudad */}
            <UbicacionSelects
              departamentos={departamentos}
              ciudades={ciudades}
              loading={loading || loadingUbicaciones}
            />

            {/* Campo para el barrio de residencia */}
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

            {/* Campo para la dirección detallada de domicilio */}
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

        {/* --- SECCIÓN: ACCIONES --- */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          {/* Botón de envío que muestra estado de carga */}
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
                Actualizar Cliente
              </>
            )}
          </Button>

          {/* Botón para restablecer el formulario a sus valores originales */}
          <Button
            type="button"
            variant="outline"
            className="flex-1 order-1 sm:order-2 border-dashed hover:bg-destructive/5 hover:text-destructive hover:border-destructive transition-all"
            onClick={() => form.reset()}
            disabled={loading}
          >
            <Eraser className="mr-2 h-4 w-4" />
            Restaurar
          </Button>
        </div>
      </form>
    </Form>
  );
}
