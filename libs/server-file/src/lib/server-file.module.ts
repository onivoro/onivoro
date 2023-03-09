import { S3Client } from '@aws-sdk/client-s3';
import {Module} from '@nestjs/common';
import { createS3Client } from './create-s3-client.function';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService]
})
export class ServerFileModule {
  static configure () {
    return {
      module: ServerFileModule,
      providers: [{provide: S3Client, useFactory: createS3Client}]
    }
  }
}