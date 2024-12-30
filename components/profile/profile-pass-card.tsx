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
                Pass card Active
              </span>
              <Badge variant="secondary" className="capitalize">
                {user.cardTier} Niveau
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Numéro de Carte</p>
                  <p className="font-mono text-lg">**** **** **** 1234</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Valide Jusqu'à</p>
                <p className="font-mono">12/24</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Plongées Restantes</p>
                <p className="text-2xl font-bold">8/10</p>
              </div>
              <div>
                <p className="text-sm font-medium">Lieux Valides</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Pas de Pass card Active</h3>
            <p className="text-muted-foreground text-center mb-6">
              Commencez avec une Pass card pour accéder à des lieux exclusifs.
            </p>
            <Button asChild>
              <Link href="/">Voir les Pass Cards</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}