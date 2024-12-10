"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { OrderStatusBadge } from "@/components/order/status-badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

interface ProfileOrdersProps {
  user: any
}

export function ProfileOrders({ user }: ProfileOrdersProps) {
  // Mock orders data - replace with real data
  const orders = [
    {
      id: "ORD-1234",
      date: "2024-01-15",
      status: "completed",
      tier: "basic",
      amount: 19900,
    },
    {
      id: "ORD-1235",
      date: "2024-01-20",
      status: "processing",
      tier: "pro",
      amount: 39900,
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status as any} />
              </TableCell>
              <TableCell className="capitalize">{order.tier}</TableCell>
              <TableCell>€{(order.amount / 100).toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link href={`/orders/${order.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}