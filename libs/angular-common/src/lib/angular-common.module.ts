import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const components = [
  FileUploadComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: components
})
export class AngularCommonModule { }
