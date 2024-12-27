"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AttributesTable } from "@/components/admin/products/attributes/attributes-table"
import { AttributeFilters } from "@/components/admin/products/attributes/attribute-filters"
import { Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Attribute } from "@prisma/client"
import { createAttribute, getAttributes } from "@/lib/data/attribute"
import { AttributeFormDialog } from "@/components/admin/products/attributes/attribute-form-dialog"

export default function AttributesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
const [attributes, setAttributes] = useState<Attribute[]>([])
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { toast } = useToast()

   useEffect(() => {
        const loadAttributes = async () => {
          const fetchedAttributes = await getAttributes()
          setAttributes(fetchedAttributes)
        }
        loadAttributes()
      }, [])
  
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

  const handleCreateAttribute = async (attribute/* : Attribute */) => {
    try {
      /* const response = await fetch('/api/admin/products/attributes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attribute),
      })

      if (!response.ok) throw new Error('Failed to create attribute') */
      // await createAttribute(attribute)
      const updatedAttributes = await getAttributes()
      setAttributes(updatedAttributes)
      setIsCreateDialogOpen(false)
      toast({
        title: "Attribute created",
        description: `${attribute.name} has been created successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create attribute",
        variant: "destructive",
      })
    }
  }

  const handleUpdateAttribute = async (attribute: Attribute) => {
    try {
      const response = await fetch(`/api/admin/products/attributes/${attribute.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attribute),
      })

      if (!response.ok) throw new Error('Failed to update attribute')

      const updatedAttributes = await getAttributes()
      setAttributes(updatedAttributes)
      setIsCreateDialogOpen(false)
      toast({
        title: "Attribute updated",
        description: `${attribute.name} has been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update attribute",
        variant: "destructive",
      })
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Product Attributes</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search attributes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <AttributeFilters onCreateNew={() => setIsCreateDialogOpen(true)}
          />
        <AttributesTable 
        attributes={attributes}
        setAttributes={setAttributes}
        filteredAttributes={filteredAttributes}
        selectedAttribute={selectedAttribute}
        setSelectedAttribute={setSelectedAttribute}
        searchQuery={searchQuery} 
        onUpdate={handleUpdateAttribute}
        onDelete={handleDelete}
        onOpenChange={setIsCreateDialogOpen}
        />
      </Card>

      <AttributeFormDialog
        attribute={selectedAttribute}
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateAttribute}
        setAttributes={setAttributes}
      />
    </div>
  )
}