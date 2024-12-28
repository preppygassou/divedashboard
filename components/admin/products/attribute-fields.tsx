"use client"

import { UseFormReturn } from "react-hook-form"
import { Product } from "@/lib/types/product"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash } from "lucide-react"

interface Attribute {
  id: string
  name: string
  switchers?: { id: string; name: string }[] // Optional array of switchers
}

interface AttributeFieldsProps {
  form: UseFormReturn<Product>
  allAttributes: Attribute[]
}

export function AttributeFields({ form, allAttributes }: AttributeFieldsProps) {
  const attributes = form.watch("attributes") ?? []

  const addAttribute = (attributeId: string) => {
    const currentAttributes = form.getValues("attributes") || []
    const selectedAttribute = allAttributes.find(attr => attr.id === attributeId)
    if (selectedAttribute && !currentAttributes.some((attr: { id: string }) => attr.id === attributeId)) {
      form.setValue("attributes", [...currentAttributes, { ...selectedAttribute, selectedSwitchers: [] }])
    }
  }

  const removeAttribute = (index: number) => {
    const currentAttributes = form.getValues("attributes") || []
    form.setValue(
      "attributes",
      currentAttributes.filter((_, i) => i !== index)
    )
  }

  const updateSwitchers = (attributeIndex: number, selectedSwitchers: string[]) => {
    const currentAttributes = form.getValues("attributes") || []
    currentAttributes[attributeIndex].selectedSwitchers = selectedSwitchers
    form.setValue("attributes", [...currentAttributes])
  }

  const removeVariation = (attributeIndex: number, variationId: string) => {
    const currentAttributes = form.getValues("attributes") || []
    const selectedSwitchers = currentAttributes[attributeIndex]?.selectedSwitchers || []
    const updatedSwitchers = selectedSwitchers.filter((id: string) => id !== variationId)
    currentAttributes[attributeIndex].selectedSwitchers = updatedSwitchers
    form.setValue("attributes", [...currentAttributes])
  }

  return (
    <FormField
      control={form.control}
      name="attributes"
      render={() => (
        <FormItem>
          <FormLabel>Product Attributes</FormLabel>
          <div className="space-y-4">
            {attributes.map((attribute: Attribute, index: number) => (
              <div key={attribute.id} className="space-y-2">
                {/* Attribute Name and Remove Button */}
                <div className="flex gap-4 items-center">
                  <span>{attribute.name}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeAttribute(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                {/* Switchers Selection (Multi-Select) */}
                {attribute.switchers && attribute.switchers.length > 0 && (
                  <div className="space-y-2">
                    <FormLabel>Select Variations</FormLabel>
                    <Select
                      multiple
                      value={attributes[index]?.selectedSwitchers ?? []}
                      onValueChange={(values: string[]) =>
                        updateSwitchers(index, values)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select variations" />
                      </SelectTrigger>
                      <SelectContent>
                        {attribute.switchers.map(switcher => (
                          <SelectItem key={switcher.id} value={switcher.id}>
                            {switcher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Selected Variations as Children */}
                    <div className="mt-2">
                      <FormLabel>Selected Variations</FormLabel>
                      <div className="space-y-2">
                        {/* Ensure selectedSwitchers is an array before using .map */}
                        {Array.isArray(attributes[index]?.selectedSwitchers) &&
                          attributes[index]?.selectedSwitchers.map(variationId => {
                            const variation = attribute.switchers?.find(switcher => switcher.id === variationId)
                            return variation ? (
                              <div key={variation.id} className="flex items-center gap-2">
                                <span>{variation.name}</span>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => removeVariation(index, variation.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : null
                          })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Attribute Selection */}
            <Select onValueChange={addAttribute}>
              <SelectTrigger>
                <SelectValue placeholder="Select an attribute" />
              </SelectTrigger>
              <SelectContent>
                {allAttributes.length > 0 ? (
                  allAttributes.map(attribute => (
                    <SelectItem key={attribute.id} value={attribute.id}>
                      {attribute.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No attributes available</SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
