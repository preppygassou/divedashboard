"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { OrderStatusBadge } from "@/components/order/status-badge"

const recentOrders = [
  {
    id: "1234",
    customer: "Sarah Smith",
    initials: "SS",
    status: "completed",
    tier: "pro",
    amount: 399,
  },
  {
    id: "1235",
    customer: "Michael Johnson",
    initials: "MJ",
    status: "processing",
    tier: "elite",
    amount: 799,
  },
  {
    id: "1236",
    customer: "Emily Brown",
    initials: "EB",
    status: "pending",
    tier: "basic",
    amount: 199,
  },
] as const

export function RecentOrders() {
  return (
    <div className="space-y-8">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{order.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer}</p>
            <p className="text-sm text-muted-foreground">
              {order.tier.charAt(0).toUpperCase() + order.tier.slice(1)} - €{order.amount}
            </p>
          </div>
          <div className="ml-auto">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>
      ))}
    </div>
  )
}