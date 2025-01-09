"use client"

import { useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileContent } from "@/components/profile/profile-content"
import { useState } from "react"
import { useCurrentUser } from "@/hooks/use-current-user"
import Header from "@/components/header"

export default function ProfilePage() {
  const user = useCurrentUser()

  if (!user) {
    return null
  }

  return (

      <div className="container mx-auto px-4 py-16">
        {user ? (
          <Card className="max-w-4xl mx-auto p-6">
            <ProfileHeader />
            <ProfileContent user={user} />
          </Card>
        ) : (
          <></>
        )}
      </div>
  )
}