"use client"

import { UseFormReturn } from "react-hook-form"
import { Product } from "@/lib/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash } from "lucide-react"

interface ColorPickerProps {
  form: UseFormReturn<Product>
  switcherIndex: number
}

export function ColorPicker({ form, switcherIndex }: ColorPickerProps) {
  const colors = form.watch(`switchers.${switcherIndex}.colors`) || []

  const addColor = () => {
    const currentColors = form.getValues(`switchers.${switcherIndex}.colors`) || []
    form.setValue(`switchers.${switcherIndex}.colors`, [
      ...currentColors,
      {
        id: `color-${Date.now()}`,
        name: "",
        background: "",
        preview: "",
      },
    ])
  }

  const removeColor = (colorIndex: number) => {
    const currentColors = form.getValues(`switchers.${switcherIndex}.colors`) || []
    form.setValue(
      `switchers.${switcherIndex}.colors`,
      currentColors.filter((_, i) => i !== colorIndex)
    )
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Colors</h4>
      {colors.map((_, colorIndex) => (
        <div key={colorIndex} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            placeholder="Color Name"
            {...form.register(
              `switchers.${switcherIndex}.colors.${colorIndex}.name`
            )}
          />
          <Input
            placeholder="Background"
            {...form.register(
              `switchers.${switcherIndex}.colors.${colorIndex}.background`
            )}
          />
          <Input
            placeholder="Pattern URL (optional)"
            {...form.register(
              `switchers.${switcherIndex}.colors.${colorIndex}.pattern`
            )}
          />
          <div className="flex gap-2">
            <Input
              placeholder="Preview URL"
              {...form.register(
                `switchers.${switcherIndex}.colors.${colorIndex}.preview`
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeColor(colorIndex)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addColor}>
        <Plus className="mr-2 h-4 w-4" />
        Add Color
      </Button>
    </div>
  )
}