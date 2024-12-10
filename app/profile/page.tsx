"use client"

import { useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { CreditCard } from "lucide-react"
import Link from "next/link"
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
        <Link href="/" className="flex items-center space-x-2">
          <CreditCard className="h-8 w-8" />
          <span className="text-2xl font-bold">Dive Card</span>
        </Link>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {session ? (
          <Card className="max-w-4xl mx-auto p-6">
            <ProfileHeader user={session.user} />
            <ProfileContent user={session.user} />
          </Card>
        ) : (
          <Card className="max-w-md mx-auto p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Access Your Profile</h1>
            <p className="text-muted-foreground mb-6">
              Please log in or create an account to view your profile.
            </p>
            <Button onClick={() => setShowAuthDialog(true)}>
              Login or Register
            </Button>
          </Card>
        )}

        <AuthDialog
          open={showAuthDialog}
          onOpenChange={setShowAuthDialog}
          onSuccess={() => setShowAuthDialog(false)}
        />
      </div>
    </main>
  )
}