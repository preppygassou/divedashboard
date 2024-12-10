"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", views: 2400, purchases: 400 },
  { name: "Feb", views: 1398, purchases: 300 },
  { name: "Mar", views: 9800, purchases: 600 },
  { name: "Apr", views: 3908, purchases: 450 },
  { name: "May", views: 4800, purchases: 500 },
  { name: "Jun", views: 3800, purchases: 380 },
]

export function ProductAnalytics() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="hsl(var(--primary))"
              name="Views"
            />
            <Line
              type="monotone"
              dataKey="purchases"
              stroke="hsl(var(--destructive))"
              name="Purchases"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}