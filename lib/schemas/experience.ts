import * as z from "zod"

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  imageUrl: z.string().url().optional(),
  allowedTiers: z.array(z.enum(['dive_plus', 'dive_ultra', 'dive_max'])).min(1, "At least one tier must be selected"),
  status: z.enum(['draft', 'published', 'cancelled', 'completed']).default('draft'),
})

export type ExperienceFormData = z.infer<typeof experienceSchema>