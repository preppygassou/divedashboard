"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Order } from "@/lib/types/order"

const statuses: Order["status"][] = ["pending", "processing", "completed", "cancelled"]
const tiers: Order["tier"][] = ["basic", "pro", "elite"]

export function OrderFilters() {
  return (
    <div className="flex flex-col gap-4 p-4 border-b sm:flex-row">
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status} className="capitalize">
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by tier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tiers</SelectItem>
          {tiers.map((tier) => (
            <SelectItem key={tier} value={tier} className="capitalize">
              {tier}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2 ml-auto">
        <Button variant="outline">Export</Button>
        <Button variant="outline">Print</Button>
      </div>
    </div>
  )
}