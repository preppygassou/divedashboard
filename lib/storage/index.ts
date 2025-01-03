import { CONFIG } from "@/s3.config";
import { S3StorageProvider } from "./implementations/s3";

const providers = {
  S3: new S3StorageProvider()
}

export const storageProvider = providers[CONFIG.providers.storage.provider as keyof typeof providers]