'use server'

import { storageProvider } from "@/lib/storage"

// Ensure storageProvider is defined
if (!storageProvider) {
  throw new Error("storageProvider is not defined");
}

export async function submitImageAction(prevState: any, formData: FormData) {
  const file = formData.get('file') as File
  const data = await storageProvider.upload(file)
  
  return data;
}

export async function submitDeleteImageAction(key:string) {

  await storageProvider.delete(key)
  
}


export async function submitProfileImageAction(prevState: any, formData: FormData) {
  const file = formData.get('file') as File
  const data = await storageProvider.upload(file)
  
  return data;
}