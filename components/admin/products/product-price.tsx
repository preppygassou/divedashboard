"use client"

interface ProductPriceProps {
  price: number
}

export function ProductPrice({ price }: ProductPriceProps) {
  return (
    <span>€{(price / 100).toFixed(2)}</span>
  )
}