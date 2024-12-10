"use client"

import { Review } from "@/lib/types/review"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

interface ReviewSummaryProps {
  reviews: Review[]
}

export function ReviewSummary({ reviews }: ReviewSummaryProps) {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const ratingCounts = Array.from({ length: 5 }, (_, i) => {
    const count = reviews.filter(review => review.rating === i + 1).length
    return {
      rating: i + 1,
      count,
      percentage: (count / reviews.length) * 100
    }
  }).reverse()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
        <div className="flex flex-col">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Based on {reviews.length} reviews
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {ratingCounts.map(({ rating, count, percentage }) => (
          <div key={rating} className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-20">
              <span>{rating}</span>
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
            <Progress value={percentage} className="flex-1" />
            <div className="w-12 text-sm text-muted-foreground">
              {count}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}