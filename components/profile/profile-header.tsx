"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { useState } from "react"
import { LogoutButton } from "../auth/logout-button"
import { ExitIcon } from "@radix-ui/react-icons"
import { useFormState } from "react-dom";
import { submitFormAction } from "@/actions/upload"
interface ProfileHeaderProps {
  user: any
}

const initialState = {
  url: '',
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [avatarUrl, setAvatarUrl] = useState(user.image)
  const [state, formAction] = useFormState(submitFormAction, initialState)

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const customEndpointUrl =
    "/api/upload";
  const authorizationHeader =
    "Basic " + btoa("ninopreppy:QJnb 0iAy am4u DJOk hU7Z ITRj");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadToS3 = async () => {
    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(customEndpointUrl, {
        method: "POST",
        headers: {
          Authorization: authorizationHeader,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data",data)
        setStatus(`File uploaded successfully! File URL: ${data.url}`);
      } else {
        const error = await response.json();
        setStatus(`Upload failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("An error occurred while uploading the file.");
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form action={formAction} className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-32 w-32">
          <AvatarImage src={avatarUrl} alt={user.name} />
          <AvatarFallback className="text-4xl">
            {user.name?.split(" ").map((n: string) => n[0]).join("")}
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
        <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        <LogoutButton>
            <Button variant="ghost" className="flex items-center">
            <ExitIcon className="h-4 w-4 mr-2" />
            Se déconnecter
            </Button>
        </LogoutButton>
      </div>

       <div>
      <h2>Upload File to S3-Compatible Storage via WordPress</h2>
      <input type="file" name="file" id="file" /* onChange={handleFileChange} */ />
      <button type="submit"/*  onClick={uploadToS3} */>Upload</button>
      <p>{status}</p>
    </div> 
    {state.url && (
        <img src={state.url} alt={state.url} />
      )}
    </form>
  )
}