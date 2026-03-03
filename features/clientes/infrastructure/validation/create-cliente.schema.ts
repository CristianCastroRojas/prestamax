import { z } from "zod";

/**
 * Esquema de validación para la creación de clientes.
 * Incluye limpieza de datos (trim, toLowerCase) y mensajes de error personalizados
 * para mostrar directamente en los formularios de Shadcn/ui.
 */
export const createClienteSchema = z.object({
  nombre: z
    .string()
    .trim()
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
    .or(z.literal("")), // Permite strings vacíos del formulario sin fallar

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

  // Validaciones para IDs (ComboBoxes/Selects)
  id_tipo_documento: z
    .number()
    .int()
    .positive("Seleccione un tipo de documento"),
  id_ciudad: z.number().int().positive("Seleccione una ciudad"),
  id_departamento: z.number().int().positive("Seleccione un departamento"),

  estado: z.boolean(),
});

/**
 * Tipo inferido del esquema para usar en componentes de React Hook Form
 */
export type CreateClienteInput = z.infer<typeof createClienteSchema>;
