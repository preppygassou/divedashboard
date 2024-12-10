"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RecentOrders } from "../recent-orders"

export function RecentOrdersCard() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <RecentOrders />
      </CardContent>
    </Card>
  )
}