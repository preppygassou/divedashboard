"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProductsTable } from "@/components/admin/products/products-table"
import { ProductFilters } from "@/components/admin/products/product-filters"
import { ProductFormDialog } from "@/components/admin/products/product-form-dialog"
import { Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Product } from "@/lib/types/product"
import { products as initialProducts } from "@/lib/data/products"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [products, setProducts] = useState<Record<string, Product>>(initialProducts)
  const { toast } = useToast()

  const handleCreateProduct = (product: Product) => {
    setProducts((prev) => ({
      ...prev,
      [product.tier]: product,
    }))
    setIsCreateDialogOpen(false)
    toast({
      title: "Product created",
      description: `${product.name} has been created successfully.`,
    })
  }

  const handleUpdateProduct = (product: Product) => {
    setProducts((prev) => ({
      ...prev,
      [product.tier]: product,
    }))
    toast({
      title: "Product updated",
      description: `${product.name} has been updated successfully.`,
    })
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => {
      const newProducts = { ...prev }
      Object.keys(newProducts).forEach((key) => {
        if (newProducts[key].id === productId) {
          delete newProducts[key]
        }
      })
      return newProducts
    })
    toast({
      title: "Product deleted",
      description: `Product has been deleted successfully.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <ProductFilters onCreateNew={() => setIsCreateDialogOpen(true)} />
        <ProductsTable
          products={products}
          searchQuery={searchQuery}
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
        />
      </Card>

      <ProductFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateProduct}
      />
    </div>
  )
}