"use client"

import { ProductColor } from "@/lib/types/product"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ColorSwitcherProps {
  colors: ProductColor[]
  selectedColor: string
  onColorChange: (colorId: string) => void
}

export function ColorSwitcher({ colors, selectedColor, onColorChange }: ColorSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onColorChange(color.id)}
          className={cn(
            "relative h-12 w-12 rounded-full overflow-hidden",
            "ring-2 ring-offset-2 ring-offset-background transition-all",
            selectedColor === color.id
              ? "ring-primary"
              : "ring-transparent hover:ring-primary/50"
          )}
          title={color.name}
        >
          {color.pattern ? (
            <Image
              src={color.pattern}
              alt={color.name}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: color.background }}
            />
          )}
        </button>
      ))}
    </div>
  )
}