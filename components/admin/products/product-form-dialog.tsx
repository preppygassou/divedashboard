"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProductForm } from "./product-form"
import { Product } from "@/lib/types/product"
import { Attribute } from "@prisma/client"

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: Product) => Promise<void>
  product?:Product
  allAttributes:Attribute[]
}

export function ProductFormDialog({
  open,
  onOpenChange,
  onSubmit,
  product,
  allAttributes
}: ProductFormDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-scroll max-w-4xl md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
      <ProductForm allAttributes={allAttributes} product={product} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}