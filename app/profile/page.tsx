"use client"

import { useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileContent } from "@/components/profile/profile-content"
import { Button } from "@/components/ui/button"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { useState } from "react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [showAuthDialog, setShowAuthDialog] = useState(!session)

  if (!session && !showAuthDialog) {
    return null
  }



  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="container mx-auto p-4">
        <a href="/" className="flex items-center space-x-2">
          <img width={100} src="https://dive.paris/wp-content/uploads/2024/12/DIVE_2025-1024x413.png" />
        </a>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {session ? (
          <Card className="max-w-4xl mx-auto p-6">
            <ProfileHeader user={session.user}/>
            <ProfileContent user={session.user} />
          </Card>
        ) : (
          <></>
        )}

        {/* <AuthDialog
          open={showAuthDialog}
          onOpenChange={setShowAuthDialog}
          onSuccess={() => setShowAuthDialog(false)}
        /> */}
      </div>
    </main>
  )
}