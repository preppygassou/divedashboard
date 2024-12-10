"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OrderDetails } from "@/components/order/order-details"
import { Order } from "@/lib/types/order"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { OrderStatusSelect } from "./order-status-select"

interface OrderDetailsDialogProps {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  const [status, setStatus] = useState<Order["status"]>(order?.status || "pending")

  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <OrderStatusSelect
              value={status}
              onValueChange={setStatus}
            />
            <Button>Update Status</Button>
          </div>

          <OrderDetails order={{ ...order, status }} />
        </div>
      </DialogContent>
    </Dialog>
  )
}