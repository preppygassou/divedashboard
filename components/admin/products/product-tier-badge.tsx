"use client"

import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/types/product"

interface ProductTierBadgeProps {
  tier: Product["tier"]
}

export function ProductTierBadge({ tier }: ProductTierBadgeProps) {
  const variants = {
    basic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    pro: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    elite: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  }

  return (
    <Badge variant="secondary" className={variants[tier]}>
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </Badge>
  )
}