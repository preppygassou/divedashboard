"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PassCard } from "@/lib/types/pass-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PassCardStatusBadge } from "./pass-card-status-badge"
import { PassCardForm } from "./passcard-form"
import { Order } from "@prisma/client"


interface PassCardDetailsDialogProps {
  open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (product: PassCard) => Promise<void>
    passcard?:PassCard
    orders:Order[]
      setSelectedPassCard:
    React.Dispatch<React.SetStateAction<PassCard | null>>
}

export function PassCardDetailsDialog({
  open,
  onOpenChange,
  onSubmit,
  passcard,
  orders,
  setSelectedPassCard
}: PassCardDetailsDialogProps) {
  if (!passcard) return null

  return (
     <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="overflow-scroll max-w-4xl md:max-h-[700px] md:h-fit h-screen">
            <DialogHeader>
              <DialogTitle>Modifier le Pass Card</DialogTitle>
            </DialogHeader>
          <PassCardForm orders={orders} passcard={passcard} onSubmit={onSubmit} setSelectedPassCard={setSelectedPassCard} />
          </DialogContent>
        </Dialog>
  )
}