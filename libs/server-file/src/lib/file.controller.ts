import { Body, Controller, Param, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createS3Uploader } from './create-s3-uploader.function';
import { createS3Client } from './create-s3-client.function';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post(':id')
  @UseInterceptors(FilesInterceptor('files[]', 10, createS3Uploader({
    s3: createS3Client(),
    getKeySegments: req => [],
    supportedFileExtensions: ['jpg'],
    fileSizeLimit: 100_000_000,
    mimeTypes: ['image/jpeg'],
    s3MulterOptions: {
      bucket: process.env.BUCKET as string,
    }
  })))
  post(@Param('id') id: string, @Body() body: any, @UploadedFiles() files: any) {
    console.log(id, body, files);
  }
}
