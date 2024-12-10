"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Award } from "lucide-react"
import Link from "next/link"

interface ProfilePassCardProps {
  user: any
}

export function ProfilePassCard({ user }: ProfilePassCardProps) {
  const hasActiveCard = user.cardTier

  return (
    <div className="space-y-6">
      {hasActiveCard ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Active Pass Card
              </span>
              <Badge variant="secondary" className="capitalize">
                {user.cardTier} Tier
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Card Number</p>
                  <p className="font-mono text-lg">**** **** **** 1234</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Valid Until</p>
                <p className="font-mono">12/24</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Dives Remaining</p>
                <p className="text-2xl font-bold">8/10</p>
              </div>
              <div>
                <p className="text-sm font-medium">Valid Locations</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Active Pass Card</h3>
            <p className="text-muted-foreground text-center mb-6">
              Get started with a dive pass card to access exclusive diving locations.
            </p>
            <Button asChild>
              <Link href="/products">View Pass Cards</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}