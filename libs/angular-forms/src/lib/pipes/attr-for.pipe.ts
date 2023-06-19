import { Pipe, PipeTransform } from '@angular/core';
import { IFieldConfig } from '../interfaces/field-config.interface';

@Pipe({ name: 'attrFor' })
export class AttrForPipe implements PipeTransform {
  transform(uiOptions: IFieldConfig, controlName: string, attributeName: string) {
    return ((uiOptions?.fieldOptions || {})[controlName] as any)[attributeName];
  }
}
