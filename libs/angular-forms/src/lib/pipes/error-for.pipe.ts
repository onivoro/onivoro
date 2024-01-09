import { Pipe, PipeTransform } from '@angular/core';
import { FormatErrorPipe } from './format-error.pipe';

const formatErrorPipe = new FormatErrorPipe();

@Pipe({ name: 'errorFor' })
export class ErrorForPipe implements PipeTransform {
  transform(form: any, controlName?: string) {
    const err = form?.get(controlName)?.errors;
    return formatErrorPipe.transform(err, controlName);
  }
}
