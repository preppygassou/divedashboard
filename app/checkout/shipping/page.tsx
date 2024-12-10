"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userInfoSchema, type UserInfoSchema } from "@/lib/schemas/user-info"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BillingFields } from "@/components/forms/billing-fields"
import { AddressFields } from "@/components/forms/address-fields"
import { CreditCard } from "lucide-react"
import Link from "next/link"
import { AuthDialog } from "@/components/auth/auth-dialog"

export default function ShippingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tier = searchParams.get('tier')
  const [sameAsShipping, setSameAsShipping] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(true)

  const form = useForm<UserInfoSchema>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      billing: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "France",
        email: "",
        phone: "",
        birthday: "",
      },
      shipping: {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "France",
      },
    },
  })

  useEffect(() => {
    if (sameAsShipping) {
      const billingValues = form.getValues("billing")
      form.setValue("shipping.first_name", billingValues.first_name)
      form.setValue("shipping.last_name", billingValues.last_name)
      form.setValue("shipping.address_1", billingValues.address_1)
      form.setValue("shipping.address_2", billingValues.address_2)
      form.setValue("shipping.city", billingValues.city)
      form.setValue("shipping.state", billingValues.state)
      form.setValue("shipping.postcode", billingValues.postcode)
      form.setValue("shipping.country", billingValues.country)
    }
  }, [sameAsShipping, form])

  function onSubmit(data: UserInfoSchema) {
    console.log(data)
    router.push(`/checkout/payment?tier=${tier}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4">
        <Link href="/" className="flex items-center space-x-2">
          <CreditCard className="h-8 w-8" />
          <span className="text-2xl font-bold">Dive Card</span>
        </Link>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Shipping Information</h1>
            <p className="text-muted-foreground mt-2">
              Please enter your billing and shipping details
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Billing Information</h2>
                <BillingFields form={form} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="same-as-billing"
                  checked={sameAsShipping}
                  onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                />
                <label htmlFor="same-as-billing" className="text-sm">
                  Shipping address same as billing
                </label>
              </div>

              {!sameAsShipping && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                  <AddressFields form={form} type="shipping" />
                </div>
              )}

              <Button type="submit" className="w-full">
                Continue to Payment
              </Button>
            </form>
          </Form>
        </Card>
      </div>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onSuccess={() => setShowAuthDialog(false)}
      />
    </main>
  )
}