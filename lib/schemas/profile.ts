import * as z from "zod"

export const profileSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit comporter au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom de famille doit comporter au moins 2 caractères"),
  phone: z.optional(z.string().min(10, "Le numéro de téléphone doit comporter au moins 10 caractères").optional()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
 /*  addresses: z.string().min(10, "L'adresse doit comporter au moins 10 caractères").optional(), */
})

export type ProfileFormData = z.infer<typeof profileSchema>