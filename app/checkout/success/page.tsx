"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Order } from "@/lib/types/order"
import { OrderDetails } from "@/components/order/order-details"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreditCard, Download, Home } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const paymentIntent = searchParams.get("payment_intent")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Simulated order data - in a real app, this would be fetched from your backend
    if (paymentIntent) {
      setOrder({
        id: paymentIntent.slice(-6),
        status: "processing",
        tier: "basic",
        amount: 19900,
        createdAt: new Date().toISOString(),
        shipping: {
          name: "John Doe",
          address: "123 Main St",
          city: "Paris",
          postcode: "75001",
          country: "France",
        },
      })
    }
  }, [paymentIntent])

  if (!order) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-8 w-8" />
          <span className="text-2xl font-bold">Dive Card</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <CreditCard className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Thank You for Your Order!</h1>
            <p className="text-muted-foreground">
              Your order has been confirmed and will be processed shortly.
            </p>
          </div>

          <OrderDetails order={order} />

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}