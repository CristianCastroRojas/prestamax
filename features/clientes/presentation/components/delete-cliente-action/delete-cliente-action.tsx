"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteCliente } from "@/features/clientes/infrastructure/http/delete-cliente.api";

// Definición de las propiedades necesarias para identificar al cliente a eliminar
interface DeleteClienteActionProps {
  clientId: number;
  clientName: string;
}

export function DeleteClienteAction({
  clientId,
  clientName,
}: DeleteClienteActionProps) {
  // Estados para controlar la animación de carga, la visibilidad del diálogo y la navegación
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Función asíncrona para ejecutar el borrado y gestionar la respuesta del servidor
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCliente(clientId);

      // Notifica el éxito, cierra el modal y refresca los datos de la página actual
      toast.success("Cliente eliminado correctamente", {
        description: `${clientName} ya no está en la base de datos.`,
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      // Maneja errores de red o de API mostrando el mensaje correspondiente en un toast
      toast.error(
        error instanceof Error ? error.message : "No se pudo eliminar",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* Botón disparador con estilo de icono rojo y efecto de escala al hacer clic */}
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 transition-all active:scale-90"
          title="Eliminar cliente"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      {/* Contenido del diálogo con ajustes de ancho responsivo y sombras pronunciadas */}
      <AlertDialogContent className="w-[95%] max-w-md gap-6 border-red-100 shadow-2xl rounded-2xl sm:rounded-lg">
        <AlertDialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-2 text-center sm:text-left">
            {/* Contenedor del icono de advertencia con fondo rojo suave */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <AlertDialogTitle className="text-xl font-bold tracking-tight">
                ¿Confirmar eliminación?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed text-muted-foreground">
                Estás a punto de eliminar a{" "}
                <span className="font-bold text-foreground">{clientName}</span>.
                Esta acción{" "}
                <span className="font-medium text-red-600">
                  no se puede deshacer
                </span>
                .
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Acciones del pie de página con inversión de orden para mejor UX en móviles */}
        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-3">
          {/* Botón para desistir de la acción, se deshabilita durante el proceso de borrado */}
          <AlertDialogCancel
            disabled={isDeleting}
            className="w-full sm:w-auto mt-0"
          >
            Cancelar
          </AlertDialogCancel>

          {/* Botón de acción definitiva que previene el cierre automático para manejar la asincronía */}
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className={cn(
              "w-full sm:w-auto bg-red-600 font-bold text-white hover:bg-red-700",
              isDeleting && "opacity-80",
            )}
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Eliminando...
              </span>
            ) : (
              "Eliminar Cliente"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
