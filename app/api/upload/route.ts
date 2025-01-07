import { NextResponse, NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { uploadMulterS3 } from '@/lib/storage/storageMulterS3';
import path from "path";
import { writeFile } from "fs/promises";
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { CONFIG } from '@/s3.config';
import { convertFileToBuffer } from '@/helpers/convert-file-to-buffer';

export async function POST(req: NextRequest) {

  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
console.log("buffer",buffer)
    // Replace spaces in the file name with underscores
    const filename = file.name.replaceAll(" ", "_");
    console.log("filename",filename);

  const key = `${uuidv4()}_${filename}`;

  try {
    const fileBuffer = await convertFileToBuffer(file);
        console.log("fileBuffer", fileBuffer);

    const s3 = new S3({
      endpoint: process.env.STORAGE_ENDPOINT,
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
      region: process.env.STORAGE_REGION,
      s3ForcePathStyle: true,  // Ensure path-style URL format (some S3-compatible services require this)
      signatureVersion: 'v4',
      /* httpOptions: {
        rejectUnauthorized: false, // Disable SSL verification for testing
      }, */
    });
     const params = {
          Bucket: CONFIG.providers.storage.bucket as string,
          Key: CONFIG.providers.storage.path + file.name,
          Body: fileBuffer,
          ACL: 'public-read',
        };

        const result = await s3
      .upload(params)
      .promise();

console.log("result",result)
    const bucket = CONFIG.providers.storage.bucket as string;
    // verify if you need public. Is need when use N0c storage
    //const key = `public/${path.basename(file.originalname)}`; // Construct the file path in the bucket
    // Upload the file to S3

   /*  await uploadMulterS3.single('file')(req, {}, (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        return NextResponse.json({ error: 'An error occurred while uploading the file' }, { status: 500 });
      }
      const file = req?.file;

      console.log("file",file)

      if (file) {
        const customDomain = process.env.CUSTOM_ENDPOINT;
        const cleanedKey = file.key.replace(/^public\//, ''); // Remove the "public/" prefix
        const secureUrl = `${customDomain}/${cleanedKey}`;
        return NextResponse.json({
          url: file.location,  // URL of the uploaded file
          secureUrl,           // Custom domain URL
          fileName: path.basename(file.key), // File name from the S3 key
          etag: file.etag.replace(/"/g, ''),
          key: file.key,       // Full key (path to file)
          file: file
        }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
      }
    }); */

    return NextResponse.json({
      /* url: file.location,  // URL of the uploaded file
      secureUrl,           // Custom domain URL
      fileName: path.basename(file.key), // File name from the S3 key
      etag: file.etag.replace(/"/g, ''),
      key: file.key,       // Full key (path to file)
      file: file */
      url: "result.Location", // URL of the uploaded file
      /* secureUrl,   */          // Custom domain URL
      fileName: "path.basename(key)", // File name
      etag: "result.ETag", // MD5 hash (trim quotes)
      bucket,               // Bucket name
      key,    
    }, { status: 200 });

  } catch (error) {
    console.error('Error uploading to n0C Storage:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
