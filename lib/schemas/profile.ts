import * as z from "zod"

export const profileSchema = z.object({
  firstName: z.string().min(2, "firstName must be at least 2 characters"),
  lastName: z.string().min(2, "lastName must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters").optional(),
  address: z.string().min(10, "Address must be at least 10 characters").optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>