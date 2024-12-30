"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileDetails } from "./profile-details"
import { ProfilePassCard } from "./profile-pass-card"
import { ProfileOrders } from "./profile-orders"

interface ProfileContentProps {
  user: any
}

export function ProfileContent({ user }: ProfileContentProps) {
  return (
    <Tabs defaultValue="details" className="mt-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Détails du profil</TabsTrigger>
        <TabsTrigger value="pass">Pass cards</TabsTrigger>
        <TabsTrigger value="orders">Commandes</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <ProfileDetails user={user} />
      </TabsContent>
      <TabsContent value="pass">
        <ProfilePassCard user={user} />
      </TabsContent>
      <TabsContent value="orders">
        <ProfileOrders user={user} />
      </TabsContent>
    </Tabs>
  )
}