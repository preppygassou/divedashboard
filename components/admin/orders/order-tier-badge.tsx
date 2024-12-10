"use client"

import { Order } from "@/lib/types/order"

interface OrderTierBadgeProps {
  tier: Order["tier"]
}

export function OrderTierBadge({ tier }: OrderTierBadgeProps) {
  return (
    <span className="capitalize">{tier}</span>
  )
}