const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const multer = require('multer');

// Configure your S3-compatible storage

const s3 = new AWS.S3({
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  s3ForcePathStyle: true,  // Ensure path-style URL format (some S3-compatible services require this)
  signatureVersion: 'v4',
  httpOptions: {
    rejectUnauthorized: false, // Disable SSL verification for testing
  },
});



const storageMulterS3 = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
  acl: 'public-read', // File permissions (can be public or private)
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // Use a unique file name with a 'public/' prefix and timestamp
    const uniqueKey = `public/${Date.now().toString()}-${file.originalname}`;
    cb(null, uniqueKey);
  },
});

export const uploadMulterS3 = multer({ storage: storageMulterS3 });
