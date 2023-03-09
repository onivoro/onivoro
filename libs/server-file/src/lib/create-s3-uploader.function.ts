import { S3Client } from '@aws-sdk/client-s3';
import { MulterModuleOptions } from '@nestjs/platform-express';
import multerS3 = require('multer-s3');
import { join } from 'path';
import { IMulterOptions as IOptions } from './multer-options.interface';

export interface ICreateUploaderOptions {
  s3MulterOptions: Partial<IOptions>;
  getKeySegments: (req: Express.Request) => string[];
  mimeTypes?: string[] | undefined;
  supportedFileExtensions: string[];
  s3: S3Client;
  ServerSideEncryption?: string;
  fileSizeLimit?: number;
}

export const createFileFilter = (mimeTypes: ICreateUploaderOptions['mimeTypes']): MulterModuleOptions['fileFilter'] => {
  return (req, file, cb) => {
    if (!mimeTypes?.length || mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileValidationError = 'unsupported mime type';
      cb(null, false);
    }
  };
};

export const createKey = (getKeySegments: ICreateUploaderOptions['getKeySegments']): IOptions['key'] => {
  return (req, file, cb) => {
    const keySegments = getKeySegments(req);

    cb(null, join(...keySegments, file.originalname));
  };
};

export const createS3Uploader = (options: ICreateUploaderOptions): MulterModuleOptions => {
  return {
    storage: multerS3(
      {
        bucket: options.s3MulterOptions.bucket,
        s3: options.s3,
        serverSideEncryption: options.ServerSideEncryption,
        key: createKey(options.getKeySegments),
        // contentType: AUTO_CONTENT_TYPE,
        // throwMimeTypeConflictErrorIf: (contentType: string, mimeType: string, file: { originalname: string }) =>
        //   !mimeTypeValidator(contentType, mimeType, file.originalname, options.supportedFileExtensions),
      }
    ),
    fileFilter: createFileFilter(options.mimeTypes),
    limits: {
      fileSize: options.fileSizeLimit,
    },
  };
};