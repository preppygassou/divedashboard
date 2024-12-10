"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, ShoppingCart, Users } from "lucide-react"

const metrics = [
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.4%",
    trend: "up",
  },
  {
    title: "Average Order Value",
    value: "€432",
    change: "+€23",
    trend: "up",
  },
  {
    title: "Cart Abandonment",
    value: "21%",
    change: "-2%",
    trend: "down",
  },
  {
    title: "Return Customers",
    value: "42%",
    change: "+5%",
    trend: "up",
  },
]

export function ConversionMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${
              metric.trend === "up" 
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}>
              <span className="flex items-center gap-1">
                {metric.trend === "up" ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {metric.change}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}