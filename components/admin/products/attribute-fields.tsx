"use client"

import { UseFormReturn } from "react-hook-form"
import { Product } from "@/lib/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, Trash } from "lucide-react"

interface AttributeFieldsProps {
  form: UseFormReturn<Product>
}

export function AttributeFields({ form }: AttributeFieldsProps) {
  const attributes = form.watch("attributes") || []

  const addAttribute = () => {
    const currentAttributes = form.getValues("attributes")
    form.setValue("attributes", [
      ...currentAttributes,
      { id: `attr-${Date.now()}`, name: "", value: "" },
    ])
  }

  const removeAttribute = (index: number) => {
    const currentAttributes = form.getValues("attributes")
    form.setValue(
      "attributes",
      currentAttributes.filter((_, i) => i !== index)
    )
  }

  return (
    <FormField
      control={form.control}
      name="attributes"
      render={() => (
        <FormItem>
          <FormLabel>Product Attributes</FormLabel>
          <div className="space-y-4">
            {attributes.map((_, index) => (
              <div key={index} className="flex gap-4">
                <Input
                  placeholder="Name"
                  {...form.register(`attributes.${index}.name`)}
                />
                <Input
                  placeholder="Value"
                  {...form.register(`attributes.${index}.value`)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeAttribute(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addAttribute}>
              <Plus className="mr-2 h-4 w-4" />
              Add Attribute
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}