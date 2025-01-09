"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { OrderDetailsDialog } from "./order-details-dialog"
import { Order } from "@/lib/types/order"
import { OrderStatusBadge } from "@/components/order/status-badge"
import { OrderAmount } from "./order-amount"
import { OrderDate } from "./order-date"
import { OrderTierBadge } from "./order-tier-badge"
import { OrderActions } from "./order-actions"
import Loading from "@/components/global/loading"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

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
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) =>
    order?.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order?.shippingAddress?.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  )

 

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`/api/orders`)
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <Loading/>
  }

  if (orders.length === 0) {
    return <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Pas de Pass commande Active</h3>
          </CardContent>
        </Card>
  }


  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>ID de commande</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Montant</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status as any} />
              </TableCell>
              <TableCell>€{(order.totalAmount).toFixed(2)}</TableCell>
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