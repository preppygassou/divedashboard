"use client"

import { UseFormReturn } from "react-hook-form"
import { Product } from "@/lib/types/product"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ImageUploadProps {
  form: UseFormReturn<Product>
}

export function ImageUpload({ form }: ImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPreviewUrls = Array.from(files).map(file => URL.createObjectURL(file))
    setPreviewUrls([...previewUrls, ...newPreviewUrls])

    const currentImages = form.getValues("images")
    const newImages = Array.from(files).map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      alt: file.name,
    }))

    form.setValue("images", [...currentImages, ...newImages])
  }

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images")
    const newImages = currentImages.filter((_, i) => i !== index)
    form.setValue("images", newImages)

    URL.revokeObjectURL(previewUrls[index])
    setPreviewUrls(previewUrls.filter((_, i) => i !== index))
  }

  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem>
          <FormLabel>Product Images</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.getValues("images")?.map((image, index) => (
              <div key={image.id} className="relative aspect-square">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <label className="relative aspect-square border-2 border-dashed rounded-lg hover:border-primary/50 cursor-pointer">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
                <ImagePlus className="h-8 w-8" />
                <span className="text-xs">Upload Image</span>
              </div>
              <Input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}