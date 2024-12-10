import * as z from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  tier: z.enum(["basic", "pro", "elite"]),
  images: z.array(z.object({
    id: z.string(),
    url: z.string().url(),
    alt: z.string(),
    colorId: z.string().optional(),
  })),
  attributes: z.array(z.object({
    id: z.string(),
    name: z.string(),
    value: z.string(),
  })),
  switchers: z.array(z.object({
    id: z.string(),
    name: z.string(),
    options: z.array(z.string()),
    selected: z.string(),
    colors: z.array(z.object({
      id: z.string(),
      name: z.string(),
      background: z.string(),
      pattern: z.string().optional(),
      preview: z.string(),
    })).optional(),
  })),
  features: z.array(z.string()),
})

export type ProductFormData = z.infer<typeof productSchema>