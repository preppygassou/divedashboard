"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { OrderDetailsDialog } from "./order-details-dialog"
import { Order } from "@/lib/types/order"
import { OrderStatusBadge } from "@/components/order/status-badge"
import { OrderAmount } from "./order-amount"
import { OrderDate } from "./order-date"
import { OrderTierBadge } from "./order-tier-badge"
import { OrderActions } from "./order-actions"

// Mock data - in a real app, this would come from your API
const orders: Order[] = Array.from({ length: 10 }, (_, i) => ({
  id: `ORD-${(1000 + i).toString()}`,
  status: ["pending", "processing", "completed", "cancelled"][Math.floor(Math.random() * 4)] as Order["status"],
  tier: ["basic", "pro", "elite"][Math.floor(Math.random() * 3)] as Order["tier"],
  amount: [19900, 39900, 79900][Math.floor(Math.random() * 3)],
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  shipping: {
    name: ["John Doe", "Jane Smith", "Mike Johnson"][Math.floor(Math.random() * 3)],
    address: `${Math.floor(Math.random() * 100)} Main St`,
    city: "Paris",
    postcode: "75001",
    country: "France",
  },
}))

interface OrdersTableProps {
  searchQuery: string
}

export function OrdersTable({ searchQuery }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shipping.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.shipping.name}</TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <OrderTierBadge tier={order.tier} />
                </TableCell>
                <TableCell>
                  <OrderAmount amount={order.amount} />
                </TableCell>
                <TableCell>
                  <OrderDate date={order.createdAt} />
                </TableCell>
                <TableCell className="text-right">
                  <OrderActions onView={() => setSelectedOrder(order)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      />
    </>
  )
}