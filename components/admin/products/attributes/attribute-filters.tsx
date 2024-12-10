"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { AttributeType, AttributeShape } from "@prisma/client"

interface AttributeFiltersProps {
  onCreateNew?: () => void
}

export function AttributeFilters({ onCreateNew }: AttributeFiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border-b sm:flex-row">
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {Object?.values(AttributeType).map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by shape" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Shapes</SelectItem>
          {Object.values(AttributeShape).map((shape) => (
            <SelectItem key={shape} value={shape} className="capitalize">
              {shape}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2 ml-auto">
        <Button onClick={onCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Attribute
        </Button>
      </div>
    </div>
  )
}