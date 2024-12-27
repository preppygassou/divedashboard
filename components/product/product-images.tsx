"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ProductImage } from "@/lib/types/product"

interface ProductImagesProps {
  images: ProductImage[]
}

export function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  useEffect(() => {
    setSelectedImage(images[0])
  }, [images])

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={selectedImage?.url || images[0]?.url}
          alt={selectedImage?.alt || images[0]?.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg",
              selectedImage?.id === image.id && "ring-2 ring-primary"
            )}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 20vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}