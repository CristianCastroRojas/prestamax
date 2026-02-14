import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Landmark,
  ShieldCheck,
  ArrowLeft,
  History,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { GetByIdClienteDTO } from "@/features/clientes/dtos/GetByIdClienteDTO";
import { cn } from "@/lib/utils";
import { getClienteById } from "@/features/clientes/data/getClienteById";
import { formatDate, formatDateTime } from "@/lib/formatters/date";

export default async function ClientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Asumiendo que getClienteById ya devuelve el tipo GetByIdClienteDTO
  const cliente: GetByIdClienteDTO | null = await getClienteById(Number(id));

  if (!cliente) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-6 sm:py-8 animate-in fade-in duration-500">
      {/* Botón Volver - Ajuste de margen en móvil */}
      <div className="mb-4 sm:mb-6">
        <Link
          href="/clientes"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-muted-foreground hover:text-foreground -ml-2 text-xs sm:text-sm",
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al listado
        </Link>
      </div>

      {/* Header Profile - De vertical en móvil a horizontal en desktop */}
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-6 rounded-2xl border bg-card p-5 sm:p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
            <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                {cliente.nombre} {cliente.apellido}
              </h1>
              <Badge
                variant={cliente.estado ? "default" : "secondary"}
                className={cn(
                  "h-6 font-bold uppercase text-[9px] sm:text-[10px] px-2",
                  cliente.estado &&
                    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                )}
              >
                {cliente.estado ? "Activo" : "Inactivo"}
              </Badge>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground text-xs sm:text-sm font-medium">
              <Hash className="h-3.5 w-3.5" />
              <span>ID de Cliente: {cliente.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
        {/* Card: Documentación - Ocupa 12 columnas en móvil y 7 en desktop */}
        <Card className="lg:col-span-7 overflow-hidden border-t-4 border-t-blue-500/80 shadow-sm">
          <CardHeader className="bg-muted/30 pb-4 p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">
                  Documentos
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-balance">
                  Identificación oficial registrada
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Tipo de Documento
                </p>
                <p className="text-base sm:text-lg font-bold text-foreground">
                  {cliente.tipo_documento_nombre}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Número
                </p>
                <p className="font-mono text-base sm:text-lg font-semibold tracking-tighter text-blue-700 break-all">
                  {cliente.numero_documento}
                </p>
              </div>
            </div>

            <Separator className="bg-border/60" />

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 bg-slate-100 rounded-full shrink-0">
                <Calendar className="h-5 w-5 text-slate-600" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  Fecha de Nacimiento
                </p>
                <p className="text-sm sm:text-base font-medium text-foreground italic">
                  {formatDate(cliente.fecha_nacimiento)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card: Ubicación - Ocupa 12 columnas en móvil y 5 en desktop */}
        <Card className="lg:col-span-5 overflow-hidden border-t-4 border-t-emerald-500/80 shadow-sm">
          <CardHeader className="bg-muted/30 pb-4 p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
                <Landmark className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">
                  Residencia
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Localización actual
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-emerald-600 shrink-0" />
                <div className="space-y-1 overflow-hidden">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    Ciudad y Departamento
                  </p>
                  <p className="text-base sm:text-lg font-bold leading-tight break-words">
                    {cliente.ciudad_nombre || "No registrada"}
                  </p>
                  <p className="text-xs font-medium text-emerald-600/80">
                    {cliente.departamento_nombre}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-3 sm:p-4 space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">
                    Dirección
                  </p>
                  <p className="text-sm font-semibold break-words leading-snug">
                    {cliente.direccion || "No registrada"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">
                    Barrio
                  </p>
                  <p className="text-sm font-semibold break-words">
                    {cliente.barrio || "No registrado"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card: Contacto y Auditoría - Grid inteligente (1 col móvil, 2 tablet, 4 desktop) */}
        <Card className="lg:col-span-12 overflow-hidden shadow-sm border-muted">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x border-border/40">
              {/* Correo */}
              <div className="flex items-center gap-3 p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                <div className="p-2 bg-primary/5 rounded-full shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase text-muted-foreground">
                    Correo
                  </p>
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {cliente.correo || "N/A"}
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-center gap-3 p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                <div className="p-2 bg-primary/5 rounded-full shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase text-muted-foreground">
                    Teléfono
                  </p>
                  <p className="text-xs sm:text-sm font-medium">
                    {cliente.telefono || "N/A"}
                  </p>
                </div>
              </div>

              {/* Creado */}
              <div className="flex items-center gap-3 p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                <div className="p-2 bg-slate-50 rounded-full shrink-0">
                  <History className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground">
                    Creado el
                  </p>
                  <p className="text-[11px] sm:text-[12px] font-medium leading-tight">
                    {formatDateTime(cliente.created_at)}
                  </p>
                </div>
              </div>

              {/* Actualizado */}
              <div className="flex items-center gap-3 p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                <div className="p-2 bg-slate-50 rounded-full shrink-0">
                  <ShieldCheck className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-muted-foreground">
                    Actualizado el
                  </p>
                  <p className="text-[11px] sm:text-[12px] font-medium leading-tight">
                    {formatDateTime(cliente.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
