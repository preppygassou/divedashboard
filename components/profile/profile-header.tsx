"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { useState } from "react"
import { LogoutButton } from "../auth/logout-button"
import { ExitIcon } from "@radix-ui/react-icons"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useSession } from "next-auth/react"
import { settings } from "@/actions/settings"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import Loading from "../global/loading"
import { submitDeleteImageAction } from "@/actions/upload"


export function ProfileHeader() {

  const user = useCurrentUser();

  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const [avatarUrl, setAvatarUrl] = useState(user?.profileImage?.url)

  const customEndpointUrl =
    "/api/upload";

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      if(avatarUrl){
         await submitDeleteImageAction(user?.profileImage?.key)
      }

      const response = await fetch(customEndpointUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAvatarUrl(data?.url)

        const newUser = {
          password: undefined,
          newPassword: undefined,
          firstName: user?.firstName || undefined,
          lastName: user?.lastName || undefined,
          email: user?.email || undefined,
          phone: user?.phone || undefined,
          profileImage: data || undefined,
          isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,

        }

        settings(newUser)
          .then((data) => {
            if (data.error) {
              setError(data.error);
              setLoading(false)
            }

            if (data.success) {
              update();
              setSuccess(data.success);
              setLoading(false)
              setError("")
            }
          })
          .catch(() => {
            setError("Quelque chose s'est mal passé!")
            setLoading(false)
          });

      } else {
        setLoading(false)
        const error = await response.json();
        setError(`Upload failed: ${error.message}`);
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-32 w-32">
          <AvatarImage src={avatarUrl} alt={user?.firstName} />
          <AvatarFallback className="text-4xl">
            {user && user?.firstName.split(" ").map((n: string) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 rounded-full bg-primary p-2 cursor-pointer hover:bg-primary/90 transition-colors"
        >
          <Camera className="h-4 w-4 text-primary-foreground" />
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </label>
      </div>
      <div className="text-center">
        {loading && <Loading />}
        <h1 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h1>
        <p className="text-muted-foreground">{user?.email}</p>
        <LogoutButton>
          <Button variant="ghost" className="flex items-center">
            <ExitIcon className="h-4 w-4 mr-2" />
            Se déconnecter
          </Button>
        </LogoutButton>
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>

    </div>
  )
}