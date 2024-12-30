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
import { getAttributes } from "@/lib/data/attribute"
import { Attribute } from "@prisma/client"
import Loading from "@/components/global/loading"
import { ProductDetailsDialog } from "./product-details-dialog"

export default function ProductsListPage({allAttributes,fetchedProducts}:{allAttributes:Attribute[],fetchedProducts:Product[]}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { toast } = useToast()
  const [products, setProducts] = useState<Record<string, Product>>({})
 
  useEffect(() => {

    if(fetchedProducts) setProducts(fetchedProducts)
  }, [])


  const handleCreateProduct = async (product: Product) => {
   
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
      await updateProduct(product.id, product)
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
      // Show global loading indicator
      setIsLoading(true)
      
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
      setIsLoading(false)
    } finally {
      // Hide global loading indicator
      setIsLoading(false)
    }
  }
console.log("selectedProduct",selectedProduct)

  return (
    <div className="relative space-y-6">
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
        allAttributes={allAttributes}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        setSelectedProduct={setSelectedProduct}
      />
      </Card>

      <ProductFormDialog
      allAttributes={allAttributes}
      open={isCreateDialogOpen}
      onOpenChange={setIsCreateDialogOpen}
      onSubmit={handleCreateProduct}
      />
       <ProductDetailsDialog
            allAttributes={allAttributes}
              product={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              open={!!selectedProduct}
              onOpenChange={(open) => !open && setSelectedProduct(null)}
              onSubmit={handleUpdateProduct}
            />
      {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loading />
      </div>
      )}
    </div>
  )
}