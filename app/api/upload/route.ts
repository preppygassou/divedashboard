import { NextResponse, NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import S3 from 'aws-sdk/clients/s3'
import { CONFIG } from '@/s3.config'
import { convertFileToBuffer } from '@/helpers/convert-file-to-buffer'
import sharp from 'sharp'

export async function POST (req: NextRequest) {
  const formData = await req.formData()

  const file = formData.get('file')
  if (!file) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 })
  }

  // Convert the file data to a Buffer
  //const buffer = Buffer.from(await file.arrayBuffer());
  const fileBuffer = await convertFileToBuffer(file)

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(' ', '_')

  const key = `${uuidv4()}_${filename}`
  const metadata = await sharp(fileBuffer).metadata()
  const { width, height, format, size } = metadata

  try {
   
    const s3 = new S3({
      endpoint: process.env.STORAGE_ENDPOINT,
      accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
      secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
      region: process.env.STORAGE_REGION,
      s3ForcePathStyle: true, // Ensure path-style URL format (some S3-compatible services require this)
      signatureVersion: 'v4'
    })
    const params = {
      Bucket: CONFIG.providers.storage.bucket as string,
      Key: key,
      Body: fileBuffer,
      ACL: 'public-read'
    }

    const response = await s3.upload(params).promise()

    const alternativeText = filename.substring(0, filename.lastIndexOf('.'))
    const data = {
      provider: 'minio',
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
    }
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error uploading to n0C Storage:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
