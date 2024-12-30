"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Product } from "@/lib/types/product"
import { ProductForm } from "./product-form"
import { Attribute } from "@prisma/client"

interface ProductDetailsDialogProps {
  product: Product | null
  allAttributes: Attribute[] | []
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: Product) => Promise<void>
  setSelectedProduct:
React.Dispatch<React.SetStateAction<Product | null>>
}

export function ProductDetailsDialog({
  product,
  open,
  onOpenChange,
  onSubmit,
  allAttributes,
  setSelectedProduct
}: ProductDetailsDialogProps) {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-scroll md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm allAttributes={allAttributes} product={product} onSubmit={onSubmit} setSelectedProduct={setSelectedProduct}/>
      </DialogContent>
    </Dialog>
  )
}