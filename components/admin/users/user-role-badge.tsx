"use client"

import { Badge } from "@/components/ui/badge"
import { User } from "@/lib/types/user"

interface UserRoleBadgeProps {
  role: User["role"]
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={
        role === "admin"
          ? "border-primary text-primary"
          : "border-muted text-muted-foreground"
      }
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  )
}