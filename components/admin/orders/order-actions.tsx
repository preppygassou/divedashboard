"use client"

import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Order } from "@/lib/types/order"

interface OrderActionsProps {
  onView: () => void
}

export function OrderActions({ onView }: OrderActionsProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onView}
    >
      <Eye className="h-4 w-4" />
    </Button>
  )
}