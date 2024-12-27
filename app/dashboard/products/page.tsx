"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProductsTable } from "@/components/admin/products/products-table"
import { ProductFilters } from "@/components/admin/products/product-filters"
import { ProductFormDialog } from "@/components/admin/products/product-form-dialog"
import { Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Product } from "@/lib/types/product"
import { products as initialProducts } from "@/lib/data/products"
import { createProduct, deleteProduct, getProducts, updateProduct } from "@/lib/data/product"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()
  const [products, setProducts] = useState<Record<string, Product>>({})

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
    }
    loadProducts()
  }, [])

  const handleCreateProduct = async (product: Product) => {
    console.log("submit product")
    try {
      await createProduct(product)
      const updatedProducts = await getProducts()
      setProducts(updatedProducts)
      setIsCreateDialogOpen(false)
      toast({
        title: "Product created",
        description: `${product.name} has been created successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProduct = async (product: Product) => {
    try {
      await updateProduct(product)
      const updatedProducts = await getProducts()
      setProducts(updatedProducts)
      toast({
        title: "Product updated",
        description: `${product.name} has been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId)
      const updatedProducts = await getProducts()
      setProducts(updatedProducts)
      toast({
        title: "Product deleted",
        description: "Product has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  console.log("products",products)

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