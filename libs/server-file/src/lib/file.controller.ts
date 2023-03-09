import { Body, Controller, HttpStatus, Param, ParseFilePipeBuilder, Post, Req, UnsupportedMediaTypeException, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createS3Uploader } from './create-s3-uploader.function';
import { createS3Client } from './create-s3-client.function';
import multerS3 = require('multer-s3');
import {Magic} from 'mmmagic';
import { execSync } from 'child_process';
import { mimeTypeValidator } from './mime-type-validator.function';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post(':id')
  @UseInterceptors(FilesInterceptor('files[]', 10, createS3Uploader({
    s3: createS3Client(),
    getKeySegments: req => [],
    // supportedFileExtensions: ['jpg'],
    fileSizeLimit: 100_000_000,
    // mimeTypes: ['image/jpeg'],
    s3MulterOptions: {
      bucket: process.env.BUCKET as string,
      key: (req, file, cb) => {
        console.log(req.files, file);
        cb(null, Date.now().toString())
      }
    }
  })))
  post(@Param('id') id: string, @Body() body: any, @UploadedFiles() files: Express.MulterS3.File) {
    // console.log(req)
  }


  @Post()
  @UseInterceptors(FilesInterceptor('files[]', 10, createS3Uploader({
    s3: createS3Client(),
    getKeySegments: req => [],
    // supportedFileExtensions: ['jpg'],
    fileSizeLimit: 100_000_000,
    // mimeTypes: ['image/jpeg'],
    s3MulterOptions: {
      bucket: process.env.BUCKET as string,
    }
  })))
  postWorxOk(@Param('id') id: string, @Body() body: any, @UploadedFiles() files: Express.MulterS3.File, @Req() req: Express.Request) {
    console.log(req)
  }

}
