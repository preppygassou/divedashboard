"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User } from "@/lib/types/user"
import { UserStatusBadge } from "./user-status-badge"
import { UserRoleBadge } from "./user-role-badge"

interface UserDetailsContentProps {
  user: User
  status: User["status"]
  role: User["role"]
}

export function UserDetailsContent({ user, status, role }: UserDetailsContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{user.firstName} {user.lastName}</span>
          <div className="flex gap-2">
            <UserStatusBadge status={status} />
            <UserRoleBadge role={role} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Informations de contact</h3>
          <div className="text-sm text-muted-foreground">
            <p>Email: {user.email}</p>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">Détails de la carte</h3>
          <div className="text-sm text-muted-foreground">
            {user.cardTier ? (
              <p>Niveau: {user.cardTier.charAt(0).toUpperCase() + user.cardTier.slice(1)}</p>
            ) : (
              <p>Aucune carte active</p>
            )}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">Informations sur le compte</h3>
          <div className="text-sm text-muted-foreground">
            <p>Créé: {new Date(user.createdAt).toLocaleDateString()}</p>
            <p>Dernière connexion: {new Date(user.lastLogin).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}