"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Product } from "@/lib/types/product"
import { ProductActions } from "./product-actions"
import { ProductTierBadge } from "./product-tier-badge"
import { ProductPrice } from "./product-price"
import Image from "next/image"
import { Attribute } from "@prisma/client"

interface ProductsTableProps {
  products: Record<string, Product>
  allAttributes: Attribute[]
  searchQuery: string
  onUpdate: (product: Product) => Promise<void>
  onDelete: (productId: string) => void
  setSelectedProduct:
React.Dispatch<React.SetStateAction<Product | null>>
}

export function ProductsTable({
  products,
  searchQuery,
  onUpdate,
  onDelete,
  allAttributes,
  setSelectedProduct
}: ProductsTableProps) {
  const productsList = Object.values(products).map((product) => ({
    ...product,
    attributes: product.attributes
      ? product.attributes.map((attr) => ({
          ...attr.attribute,
          switchers: allAttributes.length > 0 && allAttributes.find(a => a.id === attr.attribute.id)?.switchers || []
        }))
      : []
  }))

  const filteredProducts = productsList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Price</TableHead>
              {/* <TableHead>Features</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <Image
                      src={product?.featuredImage?.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <ProductTierBadge tier={product.tier} />
                </TableCell>
                <TableCell>
                  <ProductPrice price={product.price} />
                </TableCell>
                
                <TableCell className="text-right">
                  <ProductActions
                    onView={() => setSelectedProduct(product)}
                    onEdit={() => setSelectedProduct(product)}
                    onDelete={() => onDelete(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

     {/*  <ProductDetailsDialog
      allAttributes={allAttributes}
        product={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        onSubmit={onUpdate}
      /> */}
    </>
  )
}