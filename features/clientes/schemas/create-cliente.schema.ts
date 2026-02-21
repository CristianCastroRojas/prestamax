import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z
    .string()
    .trim() // Elimina espacios accidentales
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),

  apellido: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido es demasiado largo"),

  numero_documento: z
    .string()
    .trim()
    .min(5, "El documento debe tener al menos 5 caracteres")
    .max(50),

  correo: z
    .string()
    .trim()
    .toLowerCase()
    .email("Debe ser un correo electrónico válido")
    .max(150)
    .optional()
    .nullable()
    .or(z.literal("")),

  fecha_nacimiento: z
    .string()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Fecha de nacimiento inválida",
    })
    .optional()
    .nullable()
    .or(z.literal("")),

  telefono: z
    .string()
    .trim()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20),

  barrio: z.string().trim().min(3, "El barrio es requerido").max(100),

  direccion: z.string().trim().min(5, "La dirección es requerida").max(200),

  id_tipo_documento: z
    .number()
    .int()
    .positive("Seleccione un tipo de documento"),
  id_ciudad: z.number().int().positive("Seleccione una ciudad"),
  id_departamento: z.number().int().positive("Seleccione un departamento"),

  // Al poner default, Zod permite que este campo no venga en el JSON del body
  estado: z.boolean(),
});

export type CreateClienteInput = z.infer<typeof createClienteSchema>;
