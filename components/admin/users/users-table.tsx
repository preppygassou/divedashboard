"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { UserDetailsDialog } from "./user-details-dialog"
import { User } from "@/lib/types/user"
import { UserStatusBadge } from "./user-status-badge"
import { UserRoleBadge } from "./user-role-badge"
import { UserCardTier } from "./user-card-tier"
import Loading from "@/components/global/loading"


interface UsersTableProps {
  searchQuery: string
}

export function UsersTable({ searchQuery }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

 
useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`/api/users`)
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users?.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  if (loading) {
    return <Loading/>
  }


  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Rôle</TableHead>
              {/* <TableHead>Niveau de carte</TableHead> */}
              <TableHead>Dernière connexion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role} />
                </TableCell>
                {/* <TableCell>
                  <UserCardTier tier={user.cardTier} />
                </TableCell> */}
                <TableCell>{new Date(user?.lastLogin).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedUser(user)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDetailsDialog
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
      />
    </>
  )
}