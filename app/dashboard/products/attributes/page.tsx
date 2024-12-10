"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AttributesTable } from "@/components/admin/products/attributes/attributes-table"
import { AttributeFilters } from "@/components/admin/products/attributes/attribute-filters"
import { Search } from "lucide-react"

export default function AttributesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Product Attributes</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search attributes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <AttributeFilters />
        <AttributesTable searchQuery={searchQuery} />
      </Card>
    </div>
  )
}