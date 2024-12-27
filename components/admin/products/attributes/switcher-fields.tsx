"use client"

import { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, Trash, ImagePlus } from "lucide-react"
import { AttributeType } from "@prisma/client"
import { v4 } from 'uuid'

interface SwitcherFieldsProps {
  form: UseFormReturn<any>
}

export function SwitcherFields({ form }: SwitcherFieldsProps) {
  const attributeType = form.watch("type")
  const switchers = form.watch("switchers") || []

  const addSwitcher = () => {
    const currentSwitchers = form.getValues("switchers")
    form.setValue("switchers", [
      ...currentSwitchers,
      {
        /* id: `new-${Date.now()}`, */
        name: "",
        image: attributeType === AttributeType.image ? { url: "https://dive.paris/wp-content/uploads/woocommerce-placeholder-300x300.png" } : undefined,
        slug: "",
        description: "",
      },
    ])
  }

  const removeSwitcher = (index: number) => {
    const currentSwitchers = form.getValues("switchers")
    const filters= currentSwitchers.filter((_, i) => i !== index)
    form.setValue("switchers",filters)
  }

  return (
    <FormField
      control={form.control}
      name="switchers"
      render={() => (
        <FormItem>
          <FormLabel>Switchers</FormLabel>
          <div className="space-y-4">
            {switchers.map((_, index) => (
              <div
                key={index}
                className="rounded-lg border p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Switcher {index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSwitcher(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder="Name"
                    {...form.register(`switchers.${index}.name`)}
                  />
                  <Input
                    placeholder="Slug"
                    {...form.register(`switchers.${index}.slug`)}
                  />
                </div>

                <Textarea
                  placeholder="Description"
                  {...form.register(`switchers.${index}.description`)}
                />

                {attributeType === AttributeType.image && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Image URL"
                      {...form.register(`switchers.${index}.image.url`)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Image upload logic
                      }}
                    >
                      <ImagePlus className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addSwitcher}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Switcher
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}