'use server'

import { storageProvider } from "@/lib/storage"

export async function submitFormAction(prevState: any, formData: FormData) {
  const file = formData.get('file') as File
  const url = await storageProvider?.upload(file)
  
  return {
    url
  }
}