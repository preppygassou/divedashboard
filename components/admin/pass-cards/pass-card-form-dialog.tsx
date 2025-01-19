"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PassCardForm } from "./passcard-form"
import { Order, PassCard } from "@prisma/client"

interface PassCardFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: PassCard) => Promise<void>
  passcard?:PassCard
  orders:Order[]
}

export function PassCardFormDialog({
  open,
  onOpenChange,
  onSubmit,
  passcard,
  orders
}: PassCardFormDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-scroll max-w-4xl md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Create New PassCard</DialogTitle>
        </DialogHeader>
      <PassCardForm orders={orders} passcard={passcard} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}