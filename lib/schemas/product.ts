import * as z from "zod"
import { CardTier} from "@prisma/client"


export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  featuredImage: z.object({
    name: z.string().optional(),
    provider: z.string().optional(),
    id: z.string().optional(),
    url: z.string().url().optional(),
    key: z.string().optional(),
    previewUrl: z.string().optional(),
    etag: z.string().optional(),
    width: z.number().optional(),
    format: z.string().optional(),
    height: z.number().optional(),
    size: z.number().optional(),
    alternative_text: z.string().optional(),
  }).optional(),
  price: z.number().min(0, "Price must be positive"),
  regularPrice: z.number().optional(),
  soldPrice: z.number().optional(),
  initialQuantity: z.number().min(0, "initial Quantity must be positive"),
  availableQuantity: z.number().min(0, "available Quantity must be positive"),
  soldQuantity: z.number().min(0, "sold Quantity must be positive"),
  tier:z.nativeEnum(CardTier),
  images: z.array(z.object({
    name: z.string().optional(),
    provider: z.string().optional(),
    id: z.string().optional(),
    url: z.string().url().optional(),
    key: z.string().optional(),
    previewUrl: z.string().optional(),
    etag: z.string().optional(),
    width: z.number().optional(),
    format: z.string().optional(),
    height: z.number().optional(),
    size: z.number().optional(),
    alternative_text: z.string().optional(),
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