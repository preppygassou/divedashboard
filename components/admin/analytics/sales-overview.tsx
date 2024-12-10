"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Basic", sales: 400, returns: 24 },
  { name: "Pro", sales: 300, returns: 13 },
  { name: "Elite", sales: 200, returns: 8 },
]

export function SalesOverview() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Sales by Product Tier</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="hsl(var(--primary))" name="Sales" />
            <Bar dataKey="returns" fill="hsl(var(--destructive))" name="Returns" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}