"use client"

import { UseFormReturn } from "react-hook-form"
import { Product } from "@/lib/types/product"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import { submitDeleteImageAction } from "@/actions/upload"
import Loading from "@/components/global/loading"

interface ImageUploadProps {
  form: UseFormReturn<Product>
}

export function ImageUpload({ form }: ImageUploadProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setLoading(true);
    const formData = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const currentImages = form.getValues("images")
      form.setValue("images", [...currentImages,response.data])
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  }

  const removeImage = async (key: string) => {
    setLoading(true);
    try {
      await submitDeleteImageAction(key);
      const currentImages = form.getValues("images")
      const newImages = currentImages.filter((image) => image.key !== key)
      form.setValue("images", newImages)
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem>
          <FormLabel>Product Images</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.getValues("images")?.map((image) => (
              <div key={image.id} className="relative aspect-square">
                <Image
                  src={image.url}
                  alt={image.alternative_text}
                  fill
                  className="object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => removeImage(image.key)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <label className="relative aspect-square border-2 border-dashed rounded-lg hover:border-primary/50 cursor-pointer">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
                <ImagePlus className="h-8 w-8" />
                <span className="text-xs">Upload an image</span>
              </div>
              <Input
                type="file"
                accept="image/*"
               /*  multiple */
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {loading && <Loading />}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
