"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { PassCardDetailsDialog } from "./pass-card-details-dialog"
import { PassCard } from "@/lib/types/pass-card"
import { PassCardActions } from "./pass-card-actions"
import { PassCardStatusBadge } from "./pass-card-status-badge"
import { UpdatePassCardDialog } from "./update-pass-card-dialog"
import { ShipmentDialog } from "./shipment-dialog"

interface PassCardsTableProps {
  searchQuery: string
}

export function PassCardsTable({ searchQuery,passCards,setSelectedPassCard,selectedPassCard }: PassCardsTableProps) {

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isShipmentOpen, setIsShipmentOpen] = useState(false)


  const filteredCards = passCards?.filter((card) =>
    card.cardNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Card Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Dives</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="font-medium">{card.cardNumber}</TableCell>
                <TableCell>{card?.user?.firstName}</TableCell>
                <TableCell>
                  <PassCardStatusBadge status={card.status} />
                </TableCell>
                <TableCell className="capitalize">{card.tier}</TableCell>
                <TableCell>{card.divesRemaining ?? "Unlimited"}</TableCell>
                <TableCell>{new Date(card.validUntil).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <PassCardActions
                    onView={() => {
                      setSelectedPassCard(card)
                      setIsDetailsOpen(true)
                    }}
                    onEdit={() => {
                      setSelectedPassCard(card)
                      setIsUpdateOpen(true)
                    }}
                    onShipment={() => {
                      setSelectedPassCard(card)
                      setIsShipmentOpen(true)
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PassCardDetailsDialog
        passCard={selectedPassCard}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />

      <UpdatePassCardDialog
        passCard={selectedPassCard}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
      />

      <ShipmentDialog
        passCard={selectedPassCard}
        open={isShipmentOpen}
        onOpenChange={setIsShipmentOpen}
      />
    </>
  )
}