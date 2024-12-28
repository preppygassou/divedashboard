import * as z from "zod"
import { CardTier} from "@prisma/client"


export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  featuredImage: z.object({url:z.string().url()}).optional(),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  initialQuantity: z.number().min(0, "initial Quantity must be positive"),
  availableQuantity: z.number().min(0, "available Quantity must be positive"),
  soldQuantity: z.number().min(0, "sold Quantity must be positive"),
  tier:z.nativeEnum(CardTier),
  images: z.array(z.object({
    id: z.string(),
    url: z.string().url(),
    alt: z.string(),
    colorId: z.string().optional(),
  })).optional(),
  attributes: z.array(z.object({
    id: z.string(),
    name: z.string(),
    value: z.string(),
  })).optional(),
  variations: z.array(z.object({
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
  })).optional(),
  /* features: z.array(z.string()).optional(), */
})

//export type ProductFormData = z.infer<typeof productSchema>