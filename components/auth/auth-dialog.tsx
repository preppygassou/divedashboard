"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AuthForm } from "./auth-form"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  defaultTab?: "login" | "register"
}

export function AuthDialog({
  open,
  onOpenChange,
  onSuccess,
  defaultTab = "login",
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {defaultTab === "login" ? "Bon retour" : "Créer un compte"}
          </DialogTitle>
        </DialogHeader>
        <AuthForm onSuccess={onSuccess} defaultTab={defaultTab} />
      </DialogContent>
    </Dialog>
  )
}