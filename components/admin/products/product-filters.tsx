"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product } from "@/lib/types/product"
import { Plus } from "lucide-react"

const tiers: Product["tier"][] = ["plus", "ultra", "max"]

interface ProductFiltersProps {
  onCreateNew: () => void
}

export function ProductFilters({ onCreateNew }: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border-b sm:flex-row">
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
        <Button onClick={onCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  )
}