"use client"

import { Badge } from "@/components/ui/badge"
import { PassCard } from "@/lib/types/pass-card"

interface PassCardStatusBadgeProps {
  status: PassCard["status"]
}

export function PassCardStatusBadge({ status }: PassCardStatusBadgeProps) {
  const variants = {
    pending_production: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    in_production: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    ready_to_ship: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    shipped: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    activated: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    expired: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <Badge variant="secondary" className={variants[status]}>
      {status.replace("_", " ").charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
    </Badge>
  )
}