"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User } from "@/lib/types/user"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { UserDetailsContent } from "./user-details-content"

interface UserDetailsDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  const [status, setStatus] = useState<User["status"]>(user?.status || "ACTIVE")
  const [role, setRole] = useState<User["role"]>(user?.role || "USER")

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Détails de l'utilisateur</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as User["status"])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mettre à jour le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Actif</SelectItem>
                <SelectItem value="INATIVE">Inactif</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as User["role"])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mettre à jour le rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">Utilisateur</SelectItem>
                <SelectItem value="ADMIN">Administrateur</SelectItem>
              </SelectContent>
            </Select>
            <Button>Mettre à jour l'utilisateur</Button>
          </div>

          <UserDetailsContent user={user} status={status} role={role} />
        </div>
      </DialogContent>
    </Dialog>
  )
}