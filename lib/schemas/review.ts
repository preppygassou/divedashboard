import * as z from "zod"

export const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().min(1, "Title is required").max(100),
  comment: z.string().min(10, "Review must be at least 10 characters").max(1000),
  images: z.array(z.object({
    id: z.string(),
    url: z.string().url(),
    alt: z.string(),
  })).optional(),
})

export type ReviewFormData = z.infer<typeof reviewSchema>