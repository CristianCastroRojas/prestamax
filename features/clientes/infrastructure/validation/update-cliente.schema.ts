import z from "zod";
import { createClienteSchema } from "./create-cliente.schema";

/**
 * Esquema para la actualización de clientes.
 * .partial() convierte todas las propiedades del esquema de creación en opcionales.
 * Esto permite enviar peticiones PATCH donde solo se incluya el campo a modificar.
 */
export const updateClienteSchema = createClienteSchema.partial();

/**
 * Tipo inferido para TypeScript.
 * Útil para los componentes de edición donde los datos iniciales
 * pueden estar incompletos o ser parciales.
 */
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;
