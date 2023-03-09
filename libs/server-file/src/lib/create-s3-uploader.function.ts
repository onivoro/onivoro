import { S3Client } from '@aws-sdk/client-s3';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { join } from 'path';
import { mimeTypeValidator } from './mime-type-validator.function';
import { IMulterOptions as IOptions } from './multer-options.interface';
import multerS3 from 'multer-s3-v3';

export interface ICreateUploaderOptions extends MulterOptions {
  s3MulterOptions: Partial<IOptions>;
  getKeySegments: (req: Express.Request) => string[];
  mimeTypes?: string[] | undefined;
  supportedFileExtensions?: string[];
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
        // ...options.s3MulterOptions,
        bucket: options.s3MulterOptions.bucket,
        s3: options.s3,
        serverSideEncryption: options.ServerSideEncryption,
        // key: options.s3MulterOptions.key,
        // contentType: options.s3MulterOptions.contentType,
        key: (req, file, cb) => {
          cb(null, Date.now().toString() + '-' + file.originalname)
        },
        // key: createKey(options.getKeySegments),
        // contentType: AUTO_CONTENT_TYPE,
        throwMimeTypeConflictErrorIf: (contentType: string, mimeType: string, file: { originalname: string }) =>
          !mimeTypeValidator(contentType, mimeType, file.originalname, options.supportedFileExtensions),
      } as any
    ),
    fileFilter: (req, file, cb) => {
      console.log('fileFilter', new Date().toISOString(), file, req.files[0])
      cb(null, true);
    },
    // fileFilter: createFileFilter(options.mimeTypes),
    // fileFilter(req, file, cb) {
    //   console.log({file})
    //   multerS3.AUTO_CONTENT_TYPE(req, file as any, (err, contentType, replacementStream) => {
    //     console.log({contentType, file});
    //     if (err) {
    //       return cb(err, false);
    //     }

    //     if(mimeTypeValidator(contentType, file.mimetype, file.originalname)) {
    //       cb(null, true);
    //     } else {
    //       cb(new UnsupportedMediaTypeException(`somebody fin 2 hack cuz ${contentType} aint never been no ${file.mimetype}`), false);
    //     }
    //   })
    // },
    limits: {
      fileSize: options.fileSizeLimit,
    },
  };
};