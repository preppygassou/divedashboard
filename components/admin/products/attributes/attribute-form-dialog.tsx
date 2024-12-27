"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Attribute, AttributeShape, AttributeType, Switcher } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { attributeSchema } from "@/lib/schemas"
import { SwitcherFields } from "./switcher-fields"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createAttribute, getAttributes } from "@/lib/data/attribute"

interface AttributeFormDialogProps {
  attribute?: (Attribute & { switchers: Switcher[] }) | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  onSubmit?: () => void
  setAttributes
}

export function AttributeFormDialog({
  attribute,
  open,
  onOpenChange,
  onSuccess,
  onSubmit,
  setAttributes
}: AttributeFormDialogProps) {

  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attributeup, setattributeup] = useState(false)
  const { toast } = useToast()
  

 

  const form = useForm({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: attribute?.name || "",
      slug: attribute?.slug || "",
      type: attribute?.type || AttributeType.default,
      shape: attribute?.shape || AttributeShape.default,
      switchers: attribute?.switchers || [],
    },
  })

    useEffect(() => {
      if (attribute) {
        form.reset({
          name: attribute.name || "",
          slug: attribute.slug || "",
          type: attribute.type || AttributeType.default,
          shape: attribute.shape || AttributeShape.default,
          switchers: attribute.switchers || [],
        });
      }
    }, [attribute]);

  const handleSubmit = async (values: any) => {

const switchers = attribute
  ? values.switchers
  : { create: values.switchers || [] }
values.switchers = switchers

    try {
      setIsSubmitting(true)
      const url = attribute 
        ? `/api/admin/products/attributes/${attribute.id}`
        : '/api/admin/products/attributes'
      
      const response = await fetch(url, {
        method: attribute ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to save attribute')
      }
     // await createAttribute(values)
      const updatedAttributes = await getAttributes()
      setAttributes(updatedAttributes)
      toast({
        title: `Attribute ${attribute ? 'updated' : 'created'} successfully`,
        description: `The attribute has been ${attribute ? 'updated' : 'created'}.`,
      })
      
      onSuccess?.()
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${attribute ? 'update' : 'create'} attribute. Please try again.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

 
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>
            {attribute ? "Edit Attribute" : "Create Attribute"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter attribute name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="enter-slug-here" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AttributeType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shape</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select shape" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AttributeShape).map((shape) => (
                          <SelectItem
                            key={shape}
                            value={shape}
                            className="capitalize"
                          >
                            {shape}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SwitcherFields form={form} />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {attribute ? "Update" : "Create"} Attribute
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}