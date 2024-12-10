"use client"

interface OrderAmountProps {
  amount: number
}

export function OrderAmount({ amount }: OrderAmountProps) {
  return (
    <span>€{(amount / 100).toFixed(2)}</span>
  )
}