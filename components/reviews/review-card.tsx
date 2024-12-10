"use client"

import { Review } from "@/lib/types/review"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [likes, setLikes] = useState(review.likes)
  const [hasLiked, setHasLiked] = useState(false)
  const [showAllImages, setShowAllImages] = useState(false)

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1)
      setHasLiked(true)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarFallback>
            {review.userName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{review.userName}</p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified Purchase
                  </Badge>
                )}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">{review.title}</h4>
          <p className="text-muted-foreground">{review.comment}</p>
        </div>

        {review.images && review.images.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              <span>Customer images</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(showAllImages ? review.images : review.images.slice(0, 4)).map((image) => (
                <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {!showAllImages && review.images.length > 4 && (
                <Button
                  variant="outline"
                  className="h-full"
                  onClick={() => setShowAllImages(true)}
                >
                  +{review.images.length - 4} more
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={handleLike}
            disabled={hasLiked}
          >
            <ThumbsUp className={cn(
              "mr-2 h-4 w-4",
              hasLiked && "fill-primary text-primary"
            )} />
            {likes}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}