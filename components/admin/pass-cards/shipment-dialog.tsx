"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PassCard } from "@/lib/types/pass-card"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface ShipmentDialogProps {
  passCard: PassCard | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShipmentDialog({
  passCard,
  open,
  onOpenChange,
}: ShipmentDialogProps) {
  const [trackingNumber, setTrackingNumber] = useState("")
  const { toast } = useToast()

  if (!passCard) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/admin/pass-cards/${passCard.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "shipped",
          trackingNumber,
        }),
      })

      if (!response.ok) throw new Error("Failed to update shipment")

      toast({
        title: "Shipment Updated",
        description: "The pass card shipment has been updated successfully.",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update shipment. Please try again.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Shipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking">Tracking Number</Label>
            <Input
              id="tracking"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
            />
          </div>
          <Button type="submit" className="w-full">
            Update Shipment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}