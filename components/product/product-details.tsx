"use client"

import { useState, useEffect } from "react"
import { Product, ProductImage } from "@/lib/types/product"
import { ProductImages } from "./product-images"
import { ProductAttributes } from "./product-attributes"
import { ProductSwitchers } from "./product-switchers"
import { ProductFeatures } from "./product-features"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [switchers, setSwitchers] = useState(product.switchers)
  const [currentImages, setCurrentImages] = useState<ProductImage[]>(product.images)
  const selectedColor = switchers.find(s => s.id === "color")?.selected

  useEffect(() => {
    if (selectedColor) {
      const filtered = product.images.filter(img => 
        !img.colorId || img.colorId === selectedColor
      )
      setCurrentImages(filtered)
    } else {
      setCurrentImages(product.images)
    }
  }, [selectedColor, product.images])

  const handleSwitcherChange = (id: string, value: string) => {
    setSwitchers(switchers.map(s => 
      s.id === id ? { ...s, selected: value } : s
    ))
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ProductImages images={currentImages} />
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            €{(product.price / 100).toFixed(2)}
          </p>
        </div>

        <p className="text-muted-foreground">{product.description}</p>

        <Separator />

        <ProductSwitchers
          switchers={switchers}
          onSwitcherChange={handleSwitcherChange}
        />

        <Separator />

        <ProductFeatures features={product.features} />

        <Separator />

        <ProductAttributes attributes={product.attributes} />

        <Button asChild className="w-full">
          <Link href={`/checkout/shipping?tier=${product.tier}`}>
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  )
}