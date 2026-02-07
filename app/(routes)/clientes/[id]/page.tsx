// app/clientes/[id]/page.tsx
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
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";

/* ---------------------------------------------
 * Helpers
--------------------------------------------- */
const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("es-CO", { dateStyle: "medium" })
    : "No registrada";

const formatDateTime = (date?: string) =>
  date
    ? new Date(date).toLocaleString("es-CO", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "No disponible";

/* ---------------------------------------------
 * Page
--------------------------------------------- */
export default async function ClientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cliente: ClienteDetalles | null = await getClienteById(
    Number((await params).id),
  );

  if (!cliente) notFound();

  return (
    <main className="container mx-auto max-w-6xl px-4 py-5">
      {/* Volver */}
      <div className="mb-5">
        <Link
          href="/clientes"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a clientes
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border bg-background p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {cliente.nombre} {cliente.apellido}
            </h1>
            <p className="text-xs text-muted-foreground">ID #{cliente.id}</p>
          </div>
        </div>

        <Badge className="self-start md:self-auto text-xs md:text-sm px-3 py-1 uppercase tracking-wide">
          {cliente.estadoCliente.nombre}
        </Badge>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Documentos */}
        <Card className="md:col-span-7 border-l-4 border-l-blue-500 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5" />
              Documentos del cliente
            </CardTitle>
            <CardDescription>
              Información de identificación registrada
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Tipo de documento
                </p>
                <p className="text-lg font-semibold text-blue-700">
                  {cliente.tipoDocumento.nombre}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Número de documento
                </p>
                <p className="font-mono text-lg">{cliente.numeroDocumento}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Fecha de nacimiento
                </p>
                <p>{formatDate(cliente.fechaNacimiento ?? undefined)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ubicación */}
        <Card className="md:col-span-5 border-l-4 border-l-emerald-500 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Landmark className="h-5 w-5" />
              Ubicación
            </CardTitle>
            <CardDescription>Datos de residencia del cliente</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground">
                  Ciudad
                </p>
                <p className="text-lg font-semibold">
                  {cliente.ciudad?.nombreCiudad || "No registrada"}
                </p>
                <p className="text-sm italic text-muted-foreground">
                  {cliente.ciudad?.departamento}
                </p>
              </div>
            </div>

            <div className="ml-2 space-y-2 border-l-2 border-emerald-100 pl-6">
              <div>
                <p className="text-xs font-medium underline text-muted-foreground">
                  Dirección
                </p>
                <p className="text-sm">
                  {cliente.direccion || "No registrada aún"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium underline text-muted-foreground">
                  Barrio
                </p>
                <p className="text-sm">
                  {cliente.barrio || "No registrado aún"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacto y auditoría */}
        <Card className="md:col-span-12 shadow-md">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 divide-y text-sm italic md:grid-cols-4 md:divide-x md:divide-y-0">
              <div className="flex items-center gap-3 p-4">
                <Mail className="h-4 w-4 text-primary" />
                <span>{cliente.correo || "No registrado"}</span>
              </div>

              <div className="flex items-center gap-3 p-4">
                <Phone className="h-4 w-4 text-primary" />
                <span>{cliente.telefono || "No registrado"}</span>
              </div>

              <div className="flex items-center gap-3 p-4">
                <History className="h-4 w-4 text-primary" />
                <span className="text-xs">
                  Registro: {formatDateTime(cliente.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-3 p-4">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-xs">
                  Última actualización: {formatDateTime(cliente.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
