import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { PassThrough } from 'stream';
import { ServerAwsS3Config } from '../classes/server-aws-s3-config.class';
import { IS3UploadResponse } from '../interfaces/s3-upload-response.interface';

@Injectable()
export class S3Service {
  constructor(private config: ServerAwsS3Config, private s3: S3) { }

  async upload(params: { Key: string; Bucket?: string; Body: PassThrough; }): Promise<IS3UploadResponse> {
    // todo: sanitize filename here before uploading
    return await this.s3.upload(this.addDefaultBucket(params)).promise();
  }

  async getPresignedUrl(Key: string, fileName?: string, inline = false, Bucket?: string) {
    if (!fileName) {
      fileName = Key.split('/').pop();
    }

    const url = await this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.getBucket(Bucket),
      Expires: 10,
      Key,
      ResponseContentDisposition: inline ? 'inline' : `attachment; filename="${fileName}"`,
    });

    return url;
  }

  private addDefaultBucket(params: { Key: string; Bucket?: string; Body: PassThrough; }): S3.PutObjectRequest {
    return { ...params, Bucket: this.getBucket(params?.Bucket) };
  }

  private getBucket(Bucket?: string): string {
    return Bucket || this.config.AWS_BUCKET;
  }
}
