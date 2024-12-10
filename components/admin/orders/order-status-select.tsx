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
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="processing">Processing</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  )
}