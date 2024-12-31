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
          <span>Commande #{order?.orderNumber}</span>
          <OrderStatusBadge status={order.status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Détails de la commande</h3>
          <div className="text-sm text-muted-foreground">
            {/* <p>Tier: {order.tier.charAt(0).toUpperCase() + order.tier.slice(1)}</p> */}
            <p>Montant: €{(order.totalAmount / 100).toFixed(2)}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">Informations de livraison</h3>
          <div className="text-sm text-muted-foreground">
          <p>Nom: {order?.shippingAddress?.last_name} {order?.shippingAddress?.first_name}</p>
          <p>Adresse: {order?.shippingAddress?.address}</p>
          <p>Ville: {order?.shippingAddress?.city}</p>
          <p>Code postal: {order?.shippingAddress?.postcode}</p>
          <p>Pays: {order?.shippingAddress?.country}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}