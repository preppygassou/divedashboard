"use client"

import { Check } from "lucide-react"

interface ProductFeaturesProps {
  features: string[]
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Features</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}