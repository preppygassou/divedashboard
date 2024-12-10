"use client"

import { ProductAttribute } from "@/lib/types/product"

interface ProductAttributesProps {
  attributes: ProductAttribute[]
}

export function ProductAttributes({ attributes }: ProductAttributesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Specifications</h3>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {attributes.map((attribute) => (
          <div
            key={attribute.id}
            className="rounded-lg border p-3"
          >
            <dt className="text-sm font-medium text-muted-foreground">
              {attribute.name}
            </dt>
            <dd className="mt-1 text-sm font-semibold">
              {attribute.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}