"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PassCard } from "@/lib/types/pass-card"

const statuses: PassCard["status"][] = [
  "pending_production",
  "in_production",
  "ready_to_ship",
  "shipped",
  "delivered",
  "activated",
  "expired",
  "cancelled"
]

const tiers: PassCard["tier"][] = ["dive_plus", "dive_ultra", "dive_max"]

const tierNames = {
  dive_plus: "Dive Plus",
  dive_ultra: "Dive Ultra",
  dive_max: "Dive Max"
}

export function PassCardFilters() {
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
              {status.replace("_", " ")}
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
            <SelectItem key={tier} value={tier}>
              {tierNames[tier]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2 ml-auto">
        <Button variant="outline">Export</Button>
        <Button variant="outline">Print Cards</Button>
      </div>
    </div>
  )
}