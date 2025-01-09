import { Badge } from "@/components/ui/badge"
import { Order } from "@/lib/types/order"

interface OrderStatusBadgeProps {
  status: Order['status']
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <Badge variant="secondary" className={variants[status]}>
      {status === 'pending' && 'En attente'}
      {status === 'processing' && 'En cours'}
      {status === 'completed' && 'Terminé'}
      {status === 'cancelled' && 'Annulé'}
    </Badge>
  )
}