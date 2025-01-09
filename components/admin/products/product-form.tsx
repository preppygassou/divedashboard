"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product } from "@/lib/types/product"
import { productSchema } from "@/lib/schemas/product"
import { ImageUpload } from "./image-upload"
import { AttributeFields } from "./attribute-fields"
import FileUpload from "./file-upload"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Attribute } from "@prisma/client"

interface ProductFormProps {
  product?: Product
  allAttributes?: Attribute[]
  onSubmit: (product: Product) => Promise<void>
  setSelectedProduct:
React.Dispatch<React.SetStateAction<Product | null>>
}

export function ProductForm({ product, onSubmit, allAttributes,setSelectedProduct }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      /*  id: `product-${Date.now()}`, */
      name: "",
      slug: "",
      description: "",
      price: 0,
      regularPrice: 0,
      soldPrice: 0,
      initialQuantity: 1,
      availableQuantity: 1,
      soldQuantity: 0,
      tier: "plus",
      featuredImage: {
        url: ""
      },
      /* attributes: [],
      variations: [], */
      images: [],
      /*  
       images: [],
       attributes: [],
       variations: [],
       features: [], */
    },
  })
  const [formErrors, setFormErrors] = useState<string | null>(null)

  const onError = (errors) => {
    console.error("Validation errors:", errors);
  };
  
  async function onSubmitIt(values: Product) {
    console.log("values", values)
    try {
      setIsSubmitting(true)
      await onSubmit(values)
      setSelectedProduct(null)
    } catch (error) {
      console.error("Failed to submit the form", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitIt,onError)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="featuredImage"
          render={({ field }) => (
        <FormItem>
          <FormLabel>Image en vedette</FormLabel>
          <FileUpload onChange={field.onChange} data={field.value} value={field.value?.url} />
          <FormMessage />
        </FormItem>
          )}
        />
        <div className="grid gap-4 md:grid-cols-2">


          <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
          <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
          />

          <FormField
        control={form.control}
        name="tier"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Niveau</FormLabel>
            <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
            >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez le niveau" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="plus">Plus</SelectItem>
            <SelectItem value="ultra">Ultra</SelectItem>
            <SelectItem value="max">Max</SelectItem>
          </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
          />
        </div>
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
        <FormItem>
          <FormLabel>Slug</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
        <FormItem>
          <FormLabel>Prix (en centimes)</FormLabel>
          <FormControl>
            <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regularPrice"
          render={({ field }) => (
        <FormItem>
          <FormLabel>Prix régulier (en centimes)</FormLabel>
          <FormControl>
            <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="soldPrice"
          render={({ field }) => (
        <FormItem>
          <FormLabel>Prix soldé (en centimes)</FormLabel>
          <FormControl>
            <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initialQuantity"
          render={({ field }) => (
        <FormItem>
          <FormLabel>Quantité initiale (en centimes)</FormLabel>
          <FormControl>
            <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        />
       {/*  <FormField
          control={form.control}
          name="featuredImage.url"
          render={({ field }) => (
        <FormItem>
          <FormLabel>URL de l'image en vedette</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
          )}
        /> */}

        <ImageUpload form={form} />
        <AttributeFields allAttributes={allAttributes} form={form} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {product ? "Mettre à jour le produit" : "Créer un produit"}
        </Button>
      </form>
    </Form>

  )
}