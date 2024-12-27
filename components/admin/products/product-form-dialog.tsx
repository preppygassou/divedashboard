"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProductForm } from "./product-form"

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
import { SwitcherFields } from "./switcher-fields"
import { FeatureFields } from "./feature-fields"


interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: Product) => void
  product:Product
}

export function ProductFormDialog({
  open,
  onOpenChange,
  onSubmit,
  product
}: ProductFormDialogProps) {
   const form = useForm<Product>({
      resolver: zodResolver(productSchema),
      defaultValues: product || {
       /*  id: `product-${Date.now()}`, */
        name: "",
        description: "",
        price: 0,
        initialQuantity: 1,
        availableQuantity: 1,
        soldQuantity: 0,
        tier: "plus",
        featuredImage: {
          url:"https://dive.paris/wp-content/uploads/2024/10/Group-676.png"
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
    async function onSubmitIt(values: Product) {
      console.log("values", values)
       onSubmit(values)
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-scroll max-w-4xl md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitIt)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
                <FormLabel>Tier</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (in cents)</FormLabel>
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
              <FormLabel>Initial Quantity (in cents)</FormLabel>
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

        <ImageUpload form={form} />
        <AttributeFields form={form} />
        <SwitcherFields form={form} />
        {/* <FeatureFields form={form} /> */}

        <Button type="submit">
          {product ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}