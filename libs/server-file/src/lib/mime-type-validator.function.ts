import { parse } from 'path';

import { richTextValidator } from './rich-text-validator.function';

export const mimeTypeValidator = (contentType: string, mimeType: string, originalname: string, fileExtensions: string[]) =>
  fileExtensions.includes(parse(originalname).ext?.toLowerCase?.().slice(1)) &&
  ([mimeType, 'application/octet-stream'].includes(contentType) || richTextValidator(contentType, mimeType));