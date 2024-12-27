import * as z from "zod"

export const registerSchema = z.object({
  firstName: z.string().min(2, "firstName must be at least 2 characters"),
  lastName: z.string().min(2, "lastName must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
})

export type RegisterFormData = z.infer<typeof registerSchema>