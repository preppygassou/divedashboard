"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User } from "@/lib/types/user"

const statuses: User["status"][] = ["active", "inactive"]
const roles: User["role"][] = ["USER", "ADMIN"]
const tiers: NonNullable<User["cardTier"]>[] = ["basic", "pro", "elite"]

export function UserFilters() {
  return (
    <div className="flex flex-col gap-4 p-4 border-b sm:flex-row">
     {/*  <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrer par statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status} className="capitalize">
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
 */}
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrer par rôle" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les rôles</SelectItem>
          {roles.map((role) => (
            <SelectItem key={role} value={role} className="capitalize">
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
{/* 
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrer par niveau" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les niveaux</SelectItem>
          <SelectItem value="none">Pas de carte</SelectItem>
          {tiers.map((tier) => (
            <SelectItem key={tier} value={tier} className="capitalize">
              {tier}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
 */}
      {/* <div className="flex gap-2 ml-auto">
        <Button variant="outline">Exporter</Button>
        <Button>Ajouter un utilisateur</Button>
      </div> */}
    </div>
  )
}