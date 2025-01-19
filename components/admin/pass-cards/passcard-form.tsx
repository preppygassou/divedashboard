"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Loader2 } from "lucide-react"
import { useState } from "react"
import {  Order, PassCard } from "@prisma/client"
import { passCardSchema } from "@/lib/schemas/passcard"

/* import { PassCard } from "@/lib/types/pass-card" */

interface PassCardFormProps {
  passcard?: PassCard
  orders?: Order[]
  onSubmit: (product: PassCard) => Promise<void>
  setSelectedPassCard?:
  React.Dispatch<React.SetStateAction<PassCard | null>>
  setPassCards?:
  React.Dispatch<React.SetStateAction<PassCard | null>>
}

export function PassCardForm({ passcard, orders, setSelectedPassCard,onSubmit }: PassCardFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(passCardSchema),
    defaultValues: {
      id: passcard?.id || "",
      cardNumber: passcard?.cardNumber || "",
      trackingNumber: passcard?.trackingNumber || "",
      orderId: passcard?.orderId || "",
      userId: passcard?.userId || "",
      tier: passcard?.tier || "",
      validFrom: passcard?.validFrom ? new Date(passcard.validFrom).toISOString().split('T')[0] : "",
      validUntil: passcard?.validUntil ? new Date(passcard.validUntil).toISOString().split('T')[0] : "",
      status: passcard?.status || "pending"
    },
  });
  const { handleSubmit, reset, register, control, watch } = form;

  const onError = (errors) => {
    console.error("Validation errors:", errors);
  };

 async function onSubmitIt(values: any) {
   // console.log("values", values)
    try {
      setIsSubmitting(true)
      await onSubmit(values)
      setSelectedPassCard(null)
    } catch (error) {
      console.error("Failed to submit the form", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitIt, onError)} className="space-y-4">
        <FormField
          control={control}
          name="tier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tier</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="plus">Plus</SelectItem>
                  <SelectItem value="ultra">Ultra</SelectItem>
                  <SelectItem value="max">Max</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="orderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Order" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orders?.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      {order.orderNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="validFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ValidFrom</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="validFrom (e.g., 2024-12-31)"
                  required
                  type="date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="validUntil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ValidUntil</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="validUntil (e.g., 2024-12-31)"
                  required
                  type="date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  required
                  
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
                     control={control}
                     name="status"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Status</FormLabel>
                         <Select
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                         >
                           <FormControl>
                             <SelectTrigger>
                               <SelectValue placeholder="Status" />
                             </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                             <SelectItem value="activated">Activated</SelectItem>
                             <SelectItem value="pending">Pending</SelectItem>
                             <SelectItem value="expired">Expired</SelectItem>
                             <SelectItem value="cancelled">Cancelled</SelectItem>
                           </SelectContent>
                         </Select>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {passcard ? "Mettre à jour le pass card" : "Créer un pass card"}
        </Button>
      </form>
    </Form>

  )
}