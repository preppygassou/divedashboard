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
import { AttributeDetailsDialog } from "./attribute-details-dialog"
import { AttributeActions } from "./attribute-actions"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Attribute } from "@prisma/client"

interface AttributesTableProps {
  searchQuery: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate:(attribute:Attribute) => void
  onDelete:(id: string) => Promise<void>
  attributes:Attribute[]
  filteredAttributes:Attribute[]
  selectedAttribute:Attribute
  setAttributes:React.Dispatch<React.SetStateAction<Attribute[]>>
  setSelectedAttribute: React.Dispatch<React.SetStateAction<Attribute>>
}

export function AttributesTable({ searchQuery,open,
  onUpdate,
  onDelete,
  onOpenChange,filteredAttributes,selectedAttribute,setSelectedAttribute }: AttributesTableProps) {
 
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { toast } = useToast()


  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Shape</TableHead>
              <TableHead>Switchers</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttributes.map((attribute) => (
              <TableRow key={attribute.id}>
                <TableCell className="font-medium">{attribute.name}</TableCell>
                <TableCell>{attribute.slug}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {attribute.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {attribute.shape}
                  </Badge>
                </TableCell>
                <TableCell>{attribute.switchers?.length || 0} options</TableCell>
                <TableCell className="text-right">
                  <AttributeActions
                    onView={() => {
                      setSelectedAttribute(attribute)
                      setIsDetailsOpen(true)
                    }}
                    onEdit={() => {
                      setSelectedAttribute(attribute)
                      onOpenChange(true)
                    }}
                    onDelete={() => onDelete(attribute.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AttributeDetailsDialog
        attribute={selectedAttribute}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />

      
    </>
  )
}