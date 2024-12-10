"use client"

import { UseFormReturn } from "react-hook-form"
import { Product } from "@/lib/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, Trash } from "lucide-react"

interface FeatureFieldsProps {
  form: UseFormReturn<Product>
}

export function FeatureFields({ form }: FeatureFieldsProps) {
  const features = form.watch("features") || []

  const addFeature = () => {
    const currentFeatures = form.getValues("features")
    form.setValue("features", [...currentFeatures, ""])
  }

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features")
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index)
    )
  }

  return (
    <FormField
      control={form.control}
      name="features"
      render={() => (
        <FormItem>
          <FormLabel>Product Features</FormLabel>
          <div className="space-y-4">
            {features.map((_, index) => (
              <div key={index} className="flex gap-4">
                <Input
                  placeholder="Feature description"
                  {...form.register(`features.${index}`)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature}>
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}