"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const variants = [
  {
    product: "Elite Card",
    variant: "Black Diamond",
    sales: 245,
    revenue: "€195,510",
    trend: "up",
  },
  {
    product: "Pro Card",
    variant: "Gold",
    sales: 186,
    revenue: "€74,214",
    trend: "up",
  },
  {
    product: "Basic Card",
    variant: "Ocean Blue",
    sales: 142,
    revenue: "€28,258",
    trend: "down",
  },
]

export function PopularVariants() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Product Variants</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow key={`${variant.product}-${variant.variant}`}>
                <TableCell className="font-medium">{variant.product}</TableCell>
                <TableCell>{variant.variant}</TableCell>
                <TableCell>{variant.sales}</TableCell>
                <TableCell>{variant.revenue}</TableCell>
                <TableCell>
                  <Badge
                    variant={variant.trend === "up" ? "default" : "destructive"}
                  >
                    {variant.trend === "up" ? "Trending Up" : "Trending Down"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}