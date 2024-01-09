import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttrForPipe } from './pipes/attr-for.pipe';
import { FormatErrorPipe } from './pipes/format-error.pipe';
import { LabelForPipe } from './pipes/label-for.pipe';
import { OptionsForPipe } from './pipes/options-for.pipe';
import { TypeForPipe } from './pipes/type-for.pipe';
import { ErrorForPipe } from './pipes/error-for.pipe';

const pipes = [
  AttrForPipe,
  ErrorForPipe,
  FormatErrorPipe,
  LabelForPipe,
  OptionsForPipe,
  TypeForPipe,
];

@NgModule({
  imports: [CommonModule],
  declarations: pipes,
  exports: pipes
})
export class AngularFormsModule {}
