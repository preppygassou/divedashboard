"use client"

import { Badge } from "@/components/ui/badge"
import { User } from "@/lib/types/user"

interface UserStatusBadgeProps {
  status: User["status"]
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <Badge
      variant={status === "active" ? "default" : "secondary"}
      className={
        status === "active"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      }
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}