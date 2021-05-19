import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tempFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tempFolder,
  multer: {
    storage: multer.diskStorage({
      destination: uploadFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const filename = `${fileHash}-${file.originalname}`;
        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: String(process.env.AWS_BUCKET),
    },
  },
} as IUploadConfig;
