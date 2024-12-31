"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Order } from "@/lib/types/order"

interface OrderStatusSelectProps {
  value: Order["status"]
  onValueChange: (value: Order["status"]) => void
}

export function OrderStatusSelect({ value, onValueChange }: OrderStatusSelectProps) {
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value as Order["status"])}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Update status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">En attente</SelectItem>
        <SelectItem value="processing">En cours</SelectItem>
        <SelectItem value="completed">Terminé</SelectItem>
        <SelectItem value="cancelled">Annulé</SelectItem>
        <SelectItem value="refunded">Remboursé</SelectItem>
        <SelectItem value="pending_production">En attente de production</SelectItem>
        <SelectItem value="in_production">En production</SelectItem>
        <SelectItem value="ready_to_ship">Prêt à expédier</SelectItem>
        <SelectItem value="shipped">Expédié</SelectItem>
        <SelectItem value="delivered">Livré</SelectItem>
      </SelectContent>
    </Select>
  )
}