'use server'

import { storageProvider } from "@/lib/storage"

// Ensure storageProvider is defined
if (!storageProvider) {
  throw new Error("storageProvider is not defined");
}

export async function submitFormAction(prevState: any, formData: FormData) {
  const file = formData.get('file') as File
  console.log("file",file)
  const url = await storageProvider.upload(file)
  
  return {
    url
  }
}