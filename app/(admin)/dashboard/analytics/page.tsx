"use client"

import { Card } from "@/components/ui/card"
import { ProductAnalytics } from "@/components/admin/analytics/product-analytics"
import { SalesOverview } from "@/components/admin/analytics/sales-overview"
import { ConversionMetrics } from "@/components/admin/analytics/conversion-metrics"
import { PopularVariants } from "@/components/admin/analytics/popular-variants"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>

      <div className="grid gap-6">
        <ConversionMetrics />
        <div className="grid gap-6 md:grid-cols-2">
          <SalesOverview />
          <ProductAnalytics />
        </div>
        <PopularVariants />
      </div>
    </div>
  )
}