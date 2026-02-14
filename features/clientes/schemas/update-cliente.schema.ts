import z from "zod";
import { createClienteSchema } from "./create-cliente.schema";

export const updateClienteSchema = createClienteSchema.partial();

export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;
