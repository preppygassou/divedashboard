import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { uploadMulterS3 } from '@/lib/storage/storageMulterS3';
import path from 'path';

export async function POST(req: NextResponse) {
  const { name, type, base64File } = await req.json();

  const key = `${uuidv4()}_${name}`;

  try {
    await uploadMulterS3.single('file')(req, {}, (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        return NextResponse.json({ error: 'An error occurred while uploading the file' }, { status: 500 });
      }
      const file = req.file;

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
    });
  } catch (error) {
    console.error('Error uploading to n0C Storage:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
