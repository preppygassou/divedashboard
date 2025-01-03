export const CONFIG = {
  providers: {
    storage: {
      provider: 'n0c-storage',
      endpoint: process.env.STORAGE_ENDPOINT,
      region: process.env.STORAGE_REGION,
      bucket: process.env.STORAGE_BUCKET,
      path: process.env.STORAGE_PATH,
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
    }
  }
}