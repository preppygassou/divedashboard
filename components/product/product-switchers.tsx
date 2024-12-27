"use client"

import { ProductSwitcher } from "@/lib/types/product"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ColorSwitcher } from "./color-switcher"

interface ProductVariationsProps {
  variations: ProductSwitcher[]
  onSwitcherChange: (id: string, value: string) => void
}

export function ProductVariations({ variations, onSwitcherChange }: ProductVariationsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Options</h3>
      {variations?.map((switcher) => (
        <div key={switcher.id} className="space-y-4">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {switcher.name}
          </label>
          
          {switcher.colors ? (
            <ColorSwitcher
              colors={switcher.colors}
              selectedColor={switcher.selected}
              onColorChange={(colorId) => onSwitcherChange(switcher.id, colorId)}
            />
          ) : (
            <Select
              value={switcher.selected}
              onValueChange={(value) => onSwitcherChange(switcher.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${switcher.name}`} />
              </SelectTrigger>
              <SelectContent>
                {switcher.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ))}
    </div>
  )
}