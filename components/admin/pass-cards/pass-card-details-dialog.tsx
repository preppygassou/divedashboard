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

const tierNames = {
  dive_plus: "Dive Plus",
  dive_ultra: "Dive Ultra",
  dive_max: "Dive Max"
}

interface PassCardDetailsDialogProps {
  passCard: PassCard | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PassCardDetailsDialog({
  passCard,
  open,
  onOpenChange,
}: PassCardDetailsDialogProps) {
  if (!passCard) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Pass Card Details</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Card #{passCard.cardNumber}</span>
              <PassCardStatusBadge status={passCard.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Card Information</h3>
              <div className="text-sm text-muted-foreground">
                <p>Tier: {tierNames[passCard.tier]}</p>
                <p>Dives Remaining: {passCard.divesRemaining ?? "Unlimited"}</p>
                <p>Valid From: {new Date(passCard.validFrom).toLocaleDateString()}</p>
                <p>Valid Until: {new Date(passCard.validUntil).toLocaleDateString()}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Customer Information</h3>
              <div className="text-sm text-muted-foreground">
                <p>Name: {passCard.user.name}</p>
                <p>Email: {passCard.user.email}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <div className="text-sm text-muted-foreground">
                {passCard.trackingNumber ? (
                  <>
                    <p>Tracking Number: {passCard.trackingNumber}</p>
                    <p>Status: {passCard.status}</p>
                  </>
                ) : (
                  <p>No shipping information available</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}