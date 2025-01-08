export interface IStorageProvider {
  upload: (file: File) => Promise<Object>
  delete: (path: string) => Promise<void>
}