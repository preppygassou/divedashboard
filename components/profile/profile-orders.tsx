"use client"
import { useEffect, useState } from "react"

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
import { CreditCard, Eye } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Loading from "../global/loading"

interface ProfileOrdersProps {
  user: any
}

export function ProfileOrders({ user }: ProfileOrdersProps) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`/api/orders?userId=${user.id}`)
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user.id])

  if (loading) {
    return <Loading/>
  }

  if (orders.length === 0) {
    return <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Pas de commande active</h3>
            <p className="text-muted-foreground text-center mb-6">
              Commencez avec une Pass card pour accéder à des lieux exclusifs.
            </p>
            <Button asChild>
              <Link href="/">Voir les Pass Cards</Link>
            </Button>
          </CardContent>
        </Card>
  }

  return (
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
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status as any} />
              </TableCell>
              <TableCell>€{(order.totalAmount).toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link href={`/profile/order/${order.id}`}>
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