"use client"

interface OrderDateProps {
  date: string
}

export function OrderDate({ date }: OrderDateProps) {
  return (
    <span>{new Date(date).toLocaleDateString()}</span>
  )
}