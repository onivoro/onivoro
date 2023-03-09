import { Body, Controller, HttpStatus, Param, ParseFilePipeBuilder, Post, Req, UnsupportedMediaTypeException, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createS3Uploader } from './create-s3-uploader.function';
import { createS3Client } from './create-s3-client.function';
import multerS3 = require('multer-s3');
import multer = require('multer');
import { mimeTypeValidator } from './mime-type-validator.function';
import { Readable } from 'stream';
const storage = multer.memoryStorage();
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
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
  post(@Param('id') id: string, @Body() body: any, @UploadedFiles() files: Express.MulterS3.File, @Req() req: Express.Request) {
    console.log(req)
  }


  @Post()
  @UseInterceptors(FilesInterceptor('files[]', 10, {
    fileFilter: (req, file, cb) => {
      console.log('fileFilter', new Date().toISOString(), file, req)


      multerS3.AUTO_CONTENT_TYPE(req, {...file, stream: Readable.from(file.buffer)}, (err, contentType, replacementStream) => {

        if (err) {
          return cb(err, false);
        }

        if(mimeTypeValidator(contentType, file.mimetype, file.originalname)) {
          cb(err, true);
        } else {
          // cb(err, false);
          cb(new UnsupportedMediaTypeException(`somebody fin 2 hack cuz ${contentType} aint never been no ${file.mimetype}`), false);
        }
      })
    },
  }))
  postWorxOk(@Param('id') id: string, @Body() body: any, @UploadedFiles() files: Express.MulterS3.File, @Req() req: Express.Request) {
    // console.log(req)
  }


  @Post(':id')
  @UseInterceptors(FilesInterceptor('files[]', 10, {
    storage,
    fileFilter: (req, file, cb) => {
      console.log('fileFilter', new Date().toISOString(), file, req)


      multerS3.AUTO_CONTENT_TYPE(req, {...file, stream: Readable.from(file.buffer)}, (err, contentType, replacementStream) => {

        if (err) {
          return cb(err, false);
        }

        if(mimeTypeValidator(contentType, file.mimetype, file.originalname)) {
          cb(err, true);
        } else {
          // cb(err, false);
          cb(new UnsupportedMediaTypeException(`somebody fin 2 hack cuz ${contentType} aint never been no ${file.mimetype}`), false);
        }
      })
    },
  }))
  memoryStorage(@Param('id') id: string, @Body() body: any, @UploadedFiles() files: Express.MulterS3.File, @Req() req: Express.Request) {
    // console.log(req)
  }

}
