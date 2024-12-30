import * as z from "zod"
import { CardTier} from "@prisma/client"


export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  featuredImage: z.object({url:z.string().url()}).optional(),
  price: z.number().min(0, "Price must be positive"),
  regularPrice: z.number().optional(),
  soldPrice: z.number().optional(),
  initialQuantity: z.number().min(0, "initial Quantity must be positive"),
  availableQuantity: z.number().min(0, "available Quantity must be positive"),
  soldQuantity: z.number().min(0, "sold Quantity must be positive"),
  tier:z.nativeEnum(CardTier),
  images: z.array(z.object({
    id: z.string(),
    url: z.string().url(),
    alt: z.string(),
  })).optional(),
  attributes: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).optional(),
  variations: z.array(z.object({
    attributeId: z.string(),
    switcherId: z.string(),
    featuredImage: z.object({url:z.string().url()}).optional(),
    manageStock: z.boolean().optional(),
    price: z.number().min(0, "Price must be positive"),
    regularPrice: z.number().optional(),
    soldPrice: z.number().optional(),
    initialQuantity: z.number().optional(),
    availableQuantity: z.number().min(0, "available Quantity must be positive"),
    soldQuantity: z.number().optional(),
  })).optional(),
})

//export type ProductFormData = z.infer<typeof productSchema>