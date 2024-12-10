"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Truck } from "lucide-react"

interface PassCardActionsProps {
  onView: () => void
  onEdit: () => void
  onShipment: () => void
}

export function PassCardActions({ onView, onEdit, onShipment }: PassCardActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Update Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShipment}>
          <Truck className="mr-2 h-4 w-4" />
          Manage Shipment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}