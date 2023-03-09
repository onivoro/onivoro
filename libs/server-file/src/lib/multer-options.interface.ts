// Note this is a copy of non-export interface in @types/multer-s3
import { S3 } from '@aws-sdk/client-s3';
import 'multer';

export interface IMulterOptions {
  s3: S3
  bucket:
    | ((req: Express.Request, file: Express.Multer.File, callback: (error: any, bucket?: string) => void) => void)
    | string;
  acl?:
    | ((req: Express.Request, file: Express.Multer.File, callback: (error: any, acl?: string) => void) => void)
    | string;
  cacheControl?:
    | ((req: Express.Request, file: Express.Multer.File, callback: (error: any, cacheControl?: string) => void) => void)
    | string;
  serverSideEncryption?:
    | ((
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error: any, serverSideEncryption?: string) => void
      ) => void)
    | string;
  key?(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void): void;
  contentType?(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void
  ): void;
  metadata?(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void;
}