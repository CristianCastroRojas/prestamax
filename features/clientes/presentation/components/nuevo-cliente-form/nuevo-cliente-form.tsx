"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { es } from "date-fns/locale";
import { Save, Eraser, User, Mail, CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
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

import {
  CreateClienteInput,
  createClienteSchema,
} from "@/features/clientes/infrastructure/validation/create-cliente.schema";
import { createCliente } from "@/features/clientes/infrastructure/http/create-cliente.api";
import {
  TipoDocumentoDTO,
  TipoDocumentoSelect,
} from "@/features/tipos-documentos";
import {
  CiudadDTO,
  DepartamentoDTO,
  UbicacionSelects,
} from "@/features/ubicaciones";

interface Props {
  // Función opcional que se ejecuta tras registrar el cliente con éxito
  onSuccess?: () => void;
  // Lista de tipos de identificación para el selector
  tiposDocumento: TipoDocumentoDTO[];
  // Lista de departamentos disponibles para la selección geográfica
  departamentos: DepartamentoDTO[];
  // Lista completa de ciudades que se filtrarán según el departamento elegido
  ciudades: CiudadDTO[];
}

export function NuevoClienteForm({
  onSuccess,
  tiposDocumento,
  departamentos,
  ciudades,
}: Props) {
  // Estados para controlar la carga del formulario y el renderizado en cliente
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Inicializa el enrutador de Next.js para redirecciones o actualizaciones
  const router = useRouter();

  // Configura el formulario con validación Zod y valores iniciales vacíos
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

  // Evita errores de hidratación marcando el componente como montado en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Retorna nulo durante el renderizado del servidor para evitar discrepancias visuales
  if (!isMounted) return null;

  const onSubmit = async (values: CreateClienteInput) => {
    // Activa el estado de carga y muestra el mensaje de espera inicial
    setLoading(true);
    const toastId = toast.loading("Registrando cliente...");

    try {
      // Envía los datos a la API y espera la respuesta del servidor
      const result = await createCliente(values);

      // Muestra mensaje de éxito, limpia el formulario y actualiza la vista
      toast.success("Completado", {
        description: result.message ?? "Guardado correctamente",
        id: toastId,
      });

      form.reset();
      router.refresh();
      onSuccess?.();
    } catch (error: any) {
      // Si el status es 409 (Conflict), indica que el registro ya existe en la base de datos
      if (error.status === 409) {
        return toast.warning("Dato duplicado", {
          description: error.message,
          id: toastId,
        });
      }

      // Si es 400 (Bad Request), mapea cada error del servidor directamente a su input correspondiente
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

      // Captura cualquier otro fallo (error 500, red, etc.) y muestra un aviso genérico
      toast.error("Error", {
        description: error.message ?? "No se pudo conectar con el servidor",
        id: toastId,
      });
    } finally {
      // Desactiva el estado de carga independientemente de si hubo éxito o error
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
              loading={loading}
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

            {/* Selector de fecha de nacimiento mediante un componente Popover y Calendario */}
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
            {/* Campo de correo electrónico */}
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

            {/* Campo para el teléfono de contacto */}
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
              loading={loading}
            />

            {/* Campo para el barrio */}
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

            {/* Campo para la dirección física */}
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
                <Save className="mr-2 h-4 w-4" /> Guardar Cliente
              </>
            )}
          </Button>

          {/* Botón para resetear todos los campos del formulario */}
          <Button
            type="button"
            variant="outline"
            className="flex-1 order-1 sm:order-2 border-dashed hover:bg-destructive/5 hover:text-destructive hover:border-destructive transition-all"
            onClick={() => form.reset()}
            disabled={loading}
          >
            <Eraser className="mr-2 h-4 w-4" /> Limpiar
          </Button>
        </div>
      </form>
    </Form>
  );
}
