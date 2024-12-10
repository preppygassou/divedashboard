"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Product } from "@/lib/types/product"
import { ProductForm } from "./product-form"

interface ProductDetailsDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: Product) => void
}

export function ProductDetailsDialog({
  product,
  open,
  onOpenChange,
  onSubmit,
}: ProductDetailsDialogProps) {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm product={product} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}