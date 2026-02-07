import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  FileText,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { GetAllClienteDTO } from "../../DTOs/GetAllClienteDTO";
import { cn } from "@/lib/utils"; // Utilidad estándar de shadcn

interface ClienteCardMobileProps {
  cliente: GetAllClienteDTO;
}

export function ClienteCardMobile({ cliente }: ClienteCardMobileProps) {
  const estado = cliente.estado ? "Activo" : "Inactivo";

  return (
    <Card className="lg:hidden border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar sutil con el color primario del proyecto */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none text-foreground">
                {cliente.nombre} {cliente.apellido}
              </span>
              <div className="mt-1.5">
                <Badge
                  variant={cliente.estado ? "default" : "secondary"}
                  className={cn(
                    "px-2 py-0 text-[10px] uppercase tracking-wider font-bold",
                    !cliente.estado &&
                      "bg-muted text-muted-foreground border-none",
                  )}
                >
                  {estado}
                </Badge>
              </div>
            </div>
          </div>

          <Link
            href={`/clientes/${cliente.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "h-9 w-9 rounded-full border-border bg-background shadow-sm active:scale-90 transition-transform",
            )}
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </CardHeader>

      {/* Separador visual sutil */}
      <div className="mx-4 border-t border-border/50" />

      <CardContent className="grid grid-cols-2 gap-y-4 p-4 text-sm">
        {/* Documento */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">
              Documento
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] font-semibold text-foreground">
              {cliente.tipoDocumento}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {cliente.numero_documento}
            </span>
          </div>
        </div>

        {/* Ubicación */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">
              Ubicación
            </span>
          </div>
          <span className="text-[12px] font-semibold text-foreground leading-tight">
            {cliente.ciudad}
          </span>
        </div>

        {/* Fecha Registro - Ocupa todo el ancho para mejor lectura */}
        <div className="col-span-2 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">
              Fecha de Registro
            </span>
          </div>
          <span className="text-[12px] font-medium text-foreground italic">
            {cliente.created_at
              ? new Date(cliente.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
