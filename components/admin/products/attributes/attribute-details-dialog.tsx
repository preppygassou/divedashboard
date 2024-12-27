"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Attribute, Switcher } from "@prisma/client"

interface AttributeDetailsDialogProps {
  attribute: (Attribute & { switchers: Switcher[] }) | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AttributeDetailsDialog({
  attribute,
  open,
  onOpenChange,
}: AttributeDetailsDialogProps) {
  if (!attribute) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen">
        <DialogHeader>
          <DialogTitle>Attribute Details</DialogTitle>
        </DialogHeader>
        
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{attribute.name}</span>
              <div className="flex gap-2">
                <Badge variant="secondary" className="capitalize">
                  {attribute.type}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {attribute.shape}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <div className="text-sm text-muted-foreground">
                <p>Slug: {attribute.slug}</p>
                <p>Created: {new Date(attribute.createdAt).toLocaleDateString()}</p>
                <p>Last Updated: {new Date(attribute.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Switchers</h3>
              {attribute.switchers.length > 0 ? (
                <div className="grid gap-4">
                  {attribute?.switchers?.map((switcher) => (
                    <div
                      key={switcher.id}
                      className="rounded-lg border p-4"
                    >
                      <h4 className="font-medium mb-2">{switcher.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {switcher.description || "No description"}
                      </p>
                      {switcher.image && (
                        <img
                          src={switcher.image}
                          alt={switcher.name}
                          className="mt-2 rounded-md h-20 w-20 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No switchers configured
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}