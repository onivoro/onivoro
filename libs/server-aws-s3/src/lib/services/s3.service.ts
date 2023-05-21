import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { PassThrough } from 'stream';
import { ServerAwsS3Config } from '../classes/server-aws-s3-config.class';
import { IS3UploadResponse } from '../interfaces/s3-upload-response.interface';

export type TS3Params = {
  Key: string,
  Bucket?: string | null | undefined
};

@Injectable()
export class S3Service {
  constructor(private config: ServerAwsS3Config, private s3: S3) { }

  async upload(params: TS3Params & { Body: S3.PutObjectRequest['Body'] }): Promise<IS3UploadResponse> {
    // todo: sanitize filename here before uploading
    return await this.s3.upload(this.addDefaultBucket(params)).promise();
  }

  async getPresignedUrl(params: TS3Params & { Expires: number, ResponseContentDisposition: string }) {
    return await this.s3.getSignedUrlPromise('getObject', this.addDefaultBucket(params));
  }

  async getFile(params: TS3Params) {
    if (!params?.Key) {
      throw new BadRequestException(`${S3Service.name}.${S3Service.prototype.getFile.name} requires a valid S3 key`)
    }

    const response = await this.s3.getObject(this.addDefaultBucket(params)).promise();

    return response;
  }

  async getDownloadUrl(params: TS3Params & {fileName?: string | null | undefined}) {
    if(!params || !params?.Key) {
      throw new BadRequestException(`${S3Service.name}.${S3Service.prototype.getDownloadUrl.name} requires a valid S3 key`)
    }

    return await this.getPresignedUrl({
      ...this.addDefaultBucket(params),
      Expires: 100,
      ResponseContentDisposition: `attachment; filename="${params.fileName || params.Key.split('/').pop()}"`
    });
  }

  async getAssetUrl(params: TS3Params & { Expires?: number | null | undefined }) {
    if(!params || !params?.Key) {
      throw new BadRequestException(`${S3Service.name}.${S3Service.prototype.getAssetUrl.name} requires a valid S3 key`)
    }

    return await this.getPresignedUrl({
      ...this.addDefaultBucket(params),
      Expires: params.Expires || 10_000,
      ResponseContentDisposition: 'inline'
    })
  }

  private addDefaultBucket(params: TS3Params): S3.PutObjectRequest {
    return { ...params, Bucket: this.getBucket(params?.Bucket) };
  }

  private getBucket(Bucket?: string): string {
    return Bucket || this.config.AWS_BUCKET;
  }
}
