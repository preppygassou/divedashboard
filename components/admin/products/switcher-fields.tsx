"use client"

import { UseFormReturn } from "react-hook-form"
import { Product } from "@/lib/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, Trash } from "lucide-react"
import { ColorPicker } from "./color-picker"

interface SwitcherFieldsProps {
  form: UseFormReturn<Product>
}

export function SwitcherFields({ form }: SwitcherFieldsProps) {
  const switchers = form.watch("switchers") || []

  const addSwitcher = () => {
    const currentSwitchers = form.getValues("switchers")
    form.setValue("switchers", [
      ...currentSwitchers,
      {
        id: `switch-${Date.now()}`,
        name: "",
        options: [""],
        selected: "",
        colors: [],
      },
    ])
  }

  const removeSwitcher = (index: number) => {
    const currentSwitchers = form.getValues("switchers")
    form.setValue(
      "switchers",
      currentSwitchers.filter((_, i) => i !== index)
    )
  }

  const addOption = (switcherIndex: number) => {
    const currentSwitchers = form.getValues("switchers")
    const currentOptions = currentSwitchers[switcherIndex].options
    form.setValue(`switchers.${switcherIndex}.options`, [...currentOptions, ""])
  }

  const removeOption = (switcherIndex: number, optionIndex: number) => {
    const currentSwitchers = form.getValues("switchers")
    const currentOptions = currentSwitchers[switcherIndex].options
    form.setValue(
      `switchers.${switcherIndex}.options`,
      currentOptions.filter((_, i) => i !== optionIndex)
    )
  }

  return (
    <FormField
      control={form.control}
      name="switchers"
      render={() => (
        <FormItem>
          <FormLabel>Product Switchers</FormLabel>
          <div className="space-y-6">
            {switchers.map((switcher, switcherIndex) => (
              <div key={switcherIndex} className="space-y-4 p-4 border rounded-lg">
                <div className="flex gap-4">
                  <Input
                    placeholder="Switcher Name"
                    {...form.register(`switchers.${switcherIndex}.name`)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSwitcher(switcherIndex)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Options</h4>
                  {switcher.options.map((_, optionIndex) => (
                    <div key={optionIndex} className="flex gap-4">
                      <Input
                        placeholder="Option Value"
                        {...form.register(
                          `switchers.${switcherIndex}.options.${optionIndex}`
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeOption(switcherIndex, optionIndex)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addOption(switcherIndex)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>

                {switcher.colors && (
                  <ColorPicker
                    form={form}
                    switcherIndex={switcherIndex}
                  />
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSwitcher}>
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