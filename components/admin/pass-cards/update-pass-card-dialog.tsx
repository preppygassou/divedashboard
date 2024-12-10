"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PassCard } from "@/lib/types/pass-card"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface UpdatePassCardDialogProps {
  passCard: PassCard | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdatePassCardDialog({
  passCard,
  open,
  onOpenChange,
}: UpdatePassCardDialogProps) {
  const [status, setStatus] = useState<PassCard["status"]>(passCard?.status || "pending_production")
  const { toast } = useToast()

  if (!passCard) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/admin/pass-cards/${passCard.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      toast({
        title: "Status Updated",
        description: "The pass card status has been updated successfully.",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status. Please try again.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={status} onValueChange={(value) => setStatus(value as PassCard["status"])}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending_production">Pending Production</SelectItem>
              <SelectItem value="in_production">In Production</SelectItem>
              <SelectItem value="ready_to_ship">Ready to Ship</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="activated">Activated</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Update Status
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}