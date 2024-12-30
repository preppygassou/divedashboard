"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userInfoSchema, type UserInfoSchema } from "@/lib/schemas/user-info"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BillingFields } from "@/components/forms/billing-fields"
import { AddressFields } from "@/components/forms/address-fields"
import { CreditCard } from "lucide-react"
import Link from "next/link"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { useStore } from "@/store"
import { updateShippingInfo } from "@/store/action"
import CheckoutLayout from "@/components/CheckoutLayout"
import CheckoutWizard from "@/components/CheckoutWizard"
import { Input } from '@/components/ui/input';
import { useCurrentUser } from "@/hooks/use-current-user"
export default function ShippingPage() {
  const { state, dispatch } = useStore();

  const router = useRouter()

   const user = useCurrentUser()
  const [sameAsShipping, setSameAsShipping] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(user?false:true)

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
    updateShippingInfo(dispatch, data)
    router.push('/checkout/payment');
    // router.push(`/checkout/payment?tier=${tier}`)
  }

  const inputClassName = "mt-1 block w-full border-0 border-gray-300 rounded-md shadow-sm bg-white rounded-[6px] max-w-[393px] p-[18px] text-[13px] placeholder-[#1E1E1E] focus:border-[#1E1E1E] focus:ring-0 hover:border-[#1E1E1E] h-[42px] text-[#1E1E1E]";


  return (
    <CheckoutLayout>
      <CheckoutWizard />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 space-y-[19px]">
              <h2 className="text-xl font-semibold text-[#1E1E1E]">Qui détiens la Pass Card ?</h2>
              {/* <BillingFields form={form} /> */}
              <div className="space-y-[19px]">
                {['first_name', 'last_name', 'address_1', 'address_2', 'city', 'state', 'postcode', /* 'country', */ 'email', 'phone', 'birthday'].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={`billing.${field}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={
                              field.name === 'billing.first_name' ? 'Prénom' :
                                field.name === 'billing.last_name' ? 'Nom' :
                                  field.name === 'billing.address_1' ? 'Adresse' :
                                    field.name === 'billing.address_2' ? 'Complément d\'adresse' :
                                      field.name === 'billing.city' ? 'Ville' :
                                        field.name === 'billing.state' ? 'État ou Region' :
                                          field.name === 'billing.postcode' ? 'Code postal' :
                                            field.name === 'billing.country' ? 'Pays' :
                                              field.name === 'billing.email' ? 'Email' :
                                                field.name === 'billing.phone' ? 'Numéro de téléphone' :
                                                  'Date de naissance'
                            }
                            {...field}
                            className={inputClassName}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="same-as-billing"
                  className="border-black"
                  checked={sameAsShipping}
                  onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                />
                <label htmlFor="same-as-billing" className="text-sm text-[#1E1E1E]">
                  Adresse de livraison identique à l'adresse de facturation
                </label>
              </div>
            </div>




            {!sameAsShipping && (
              <div className="flex-1  space-y-[19px]">
                <h2 className="text-xl font-semibold text-[#1E1E1E]">Quelle est l’adresse exacte ?</h2>
                <div className="space-y-[19px]">
                  {['first_name', 'last_name', 'address_1', 'address_2', 'city', 'state', 'postcode', /* 'country' */].map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={`shipping.${field}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder={
                                field.name === 'shipping.first_name' ? 'Prénom' :
                                  field.name === 'shipping.last_name' ? 'Nom' :
                                    field.name === 'shipping.address_1' ? 'Adresse' :
                                      field.name === 'shipping.address_2' ? 'Complément d\'adresse' :
                                        field.name === 'shipping.city' ? 'Ville' :
                                          field.name === 'shipping.state' ? 'État ou Region' :
                                            field.name === 'shipping.postcode' ? 'Code postal' :
                                              'Pays'
                              }
                              {...field}
                              className={inputClassName}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                {/* <AddressFields form={form} type="shipping" /> */}
              </div>
            )}

            <div className="flex-1 flex justify-center items-center">
                <Button
                type="submit"
                className="bg-[#1E1E1E] text-white rounded-[30px] px-[61px] py-[9px] shadow-md hover:bg-[#1E1E1E]"
                style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.08)' }}
                >
                Poursuivre
                </Button>
            </div>
          </div>
        </form>
      </Form>
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onSuccess={() => setShowAuthDialog(false)}
      />
    </CheckoutLayout>
  )
}