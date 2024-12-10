"use client"

import { User } from "@/lib/types/user"

interface UserCardTierProps {
  tier: User["cardTier"]
}

export function UserCardTier({ tier }: UserCardTierProps) {
  if (!tier) {
    return <span className="text-muted-foreground">No card</span>
  }

  return <span className="capitalize">{tier}</span>
}