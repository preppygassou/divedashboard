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
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Détails de la commande</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <OrderStatusSelect
              value={status}
              onValueChange={setStatus}
            />
            <Button>Mettre à jour le statut</Button>
          </div>

          <OrderDetails order={{ ...order, status }} />
        </div>
      </DialogContent>
    </Dialog>
  )
}