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
import { AttributeFormDialog } from "./attribute-form-dialog"
import { AttributeActions } from "./attribute-actions"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Attribute } from "@prisma/client"

interface AttributesTableProps {
  searchQuery: string
}

export function AttributesTable({ searchQuery }: AttributesTableProps) {
  const [attributes, setAttributes] = useState<Attribute[]>([])
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { toast } = useToast()

  const filteredAttributes = attributes.filter((attribute) =>
    attribute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attribute.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/attributes/${id}`, {
        method: "DELETE"
      })

      if (!response.ok) throw new Error("Failed to delete attribute")

      setAttributes(attributes.filter(attr => attr.id !== id))
      toast({
        title: "Attribute deleted",
        description: "The attribute has been deleted successfully."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete attribute. Please try again."
      })
    }
  }

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
                      setIsFormOpen(true)
                    }}
                    onDelete={() => handleDelete(attribute.id)}
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

      <AttributeFormDialog
        attribute={selectedAttribute}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={async (data) => {
          // Handle attribute creation/update
          setIsFormOpen(false)
        }}
      />
    </>
  )
}