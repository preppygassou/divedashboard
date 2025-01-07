import S3 from 'aws-sdk/clients/s3';
import { IStorageProvider } from "../interface";
import { CONFIG } from '@/s3.config';
import { convertFileToBuffer } from '@/helpers/convert-file-to-buffer';

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

  async upload(file: File): Promise<string> {
    const fileBuffer = await convertFileToBuffer(file);
    console.log("fileBuffer", fileBuffer);

    const params = {
      Bucket: CONFIG.providers.storage.bucket as string,
      Key: CONFIG.providers.storage.path + file.name,
      Body: fileBuffer,
      ACL: 'public-read',
    };

    try {
      const response = await this.client.upload(params).promise();
      console.log("response", response);
      return response.Location;
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
