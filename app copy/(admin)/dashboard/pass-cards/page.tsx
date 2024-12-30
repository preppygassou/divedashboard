"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PassCardsTable } from "@/components/admin/pass-cards/pass-cards-table"
import { PassCardFilters } from "@/components/admin/pass-cards/pass-card-filters"
import { Search } from "lucide-react"

export default function PassCardsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Pass Cards Management</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pass cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <PassCardFilters />
        <PassCardsTable searchQuery={searchQuery} />
      </Card>
    </div>
  )
}