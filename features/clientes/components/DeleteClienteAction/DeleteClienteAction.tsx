"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { deleteCliente } from "@/features/clientes/data/deleteCliente";

interface DeleteClienteActionProps {
  clientId: number;
  clientName: string;
}

export function DeleteClienteAction({
  clientId,
  clientName,
}: DeleteClienteActionProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteCliente(clientId);

      toast.success("Cliente eliminado correctamente", {
        description: `${clientName} ya no está en la base de datos.`,
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo eliminar",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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

      {/* Ajuste responsivo: w-[95%] para móviles y max-w-md para escritorio */}
      <AlertDialogContent className="w-[95%] max-w-md gap-6 border-red-100 shadow-2xl rounded-2xl sm:rounded-lg">
        <AlertDialogHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-2 text-center sm:text-left">
            {/* Icono centrado en móvil, a la izquierda en desktop */}
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

        {/* Footer adaptativo: Botones apilados en móvil, en línea en desktop */}
        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-3">
          <AlertDialogCancel
            disabled={isDeleting}
            className="w-full sm:w-auto mt-0"
          >
            Cancelar
          </AlertDialogCancel>

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
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              "Eliminar Cliente"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
