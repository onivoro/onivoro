import { Pipe, PipeTransform } from '@angular/core';
import { IFieldConfig } from '../interfaces/field-config.interface';

@Pipe({ name: 'typeFor' })
export class TypeForPipe implements PipeTransform {
  transform(uiOptions: IFieldConfig, controlName: string) {
    return (uiOptions?.fieldOptions || {})[controlName]?.type;
  }
}
