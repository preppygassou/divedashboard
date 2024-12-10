"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProductForm } from "./product-form"
import { Product } from "@/lib/types/product"

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: Product) => void
}

export function ProductFormDialog({
  open,
  onOpenChange,
  onSubmit,
}: ProductFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-scroll max-w-4xl md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <ProductForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}