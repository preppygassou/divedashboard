import S3 from 'aws-sdk/clients/s3';
import { IStorageProvider } from "../interface";
import { CONFIG } from '@/s3.config';
import { convertFileToBuffer } from '@/helpers/convert-file-to-buffer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';


export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      endpoint: CONFIG.providers.storage.endpoint,
      apiVersion: 'latest',
      region: CONFIG.providers.storage.region,
      accessKeyId: CONFIG.providers.storage.accessKeyId,
      secretAccessKey: CONFIG.providers.storage.secretAccessKey,
      signatureVersion: CONFIG.providers.storage.signatureVersion,
      s3ForcePathStyle: true,
    });
  }

  async upload(file: File): Promise<object> {
    const fileBuffer = await convertFileToBuffer(file);
   // Replace spaces in the file name with underscores
   const filename = file.name.replaceAll(" ", "_");

   const key = `${uuidv4()}_${filename}`;
     const metadata = await sharp(fileBuffer).metadata();
     const { width, height, format, size } = metadata;
  
    const params = {
      Bucket: CONFIG.providers.storage.bucket as string,
      Key: key,
      Body: fileBuffer,
      ACL: 'public-read',
    };

    try {
      const response = await this.client.upload(params).promise();
      
      const alternativeText = filename.substring(0, filename.lastIndexOf('.'));
      const data = {
        provider: "minio",
        name: filename,
        alternative_text: alternativeText,
        key: response.Key,
        url: response.Location,
        previewUrl: response.Location,
        etag: response.ETag,
        provider_metadata: response.ETag,
        id: response.ETag,
        width,
        height,
        format,
        size
      };
      console.log("response", data);
      return data;
    } catch (error) {
      console.log('Upload error:', error);
      throw new Error('Error uploading file');
    }
  }

  async delete(path: string): Promise<void> {
    const params = {
      Bucket: CONFIG.providers.storage.bucket as string,
      Key: path,
    };

    try {
      await this.client.deleteObject(params).promise();
    } catch (error) {
      console.error('Delete error:', error);
      throw new Error('Error deleting file');
    }
  }
}
