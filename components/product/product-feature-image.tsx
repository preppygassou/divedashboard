"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ProductImage } from "@/lib/types/product"

interface ProductFeaturedImageProps {
  featuredImage: ProductImage
}

export function ProductFeaturedImage({ featuredImage }: ProductFeaturedImageProps) {

  return (
    <div className="space-y-4 bg-[#0B0B0B] w-full h-full">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={featuredImage?.url}
          alt={featuredImage?.alt}
          fill
          className="object-scale-down"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
     {/*  <div className="grid grid-cols-4 gap-4">
        {featuredImage.map((image) => (
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
      </div> */}
    </div>
  )
}