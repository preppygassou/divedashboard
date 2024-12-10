import { Order } from "@/lib/types/order"
import { OrderStatusBadge } from "./status-badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface OrderDetailsProps {
  order: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order #{order.id}</span>
          <OrderStatusBadge status={order.status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Order Details</h3>
          <div className="text-sm text-muted-foreground">
            <p>Tier: {order.tier.charAt(0).toUpperCase() + order.tier.slice(1)}</p>
            <p>Amount: €{(order.amount / 100).toFixed(2)}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">Shipping Information</h3>
          <div className="text-sm text-muted-foreground">
            <p>{order.shipping.name}</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.postcode}</p>
            <p>{order.shipping.country}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}