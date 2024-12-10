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
import { useState } from "react"
import { UserDetailsDialog } from "./user-details-dialog"
import { User } from "@/lib/types/user"
import { UserStatusBadge } from "./user-status-badge"
import { UserRoleBadge } from "./user-role-badge"
import { UserCardTier } from "./user-card-tier"

// Mock data - in a real app, this would come from your API
const users: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: `USR-${(1000 + i).toString()}`,
  name: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Tom Brown"][Math.floor(Math.random() * 5)],
  email: `user${i + 1}@example.com`,
  status: Math.random() > 0.2 ? "active" : "inactive",
  role: Math.random() > 0.8 ? "admin" : "user",
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
  cardTier: ["basic", "pro", "elite", undefined][Math.floor(Math.random() * 4)],
}))

interface UsersTableProps {
  searchQuery: string
}

export function UsersTable({ searchQuery }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Card Tier</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <UserCardTier tier={user.cardTier} />
                </TableCell>
                <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
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