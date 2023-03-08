import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const components = [
  FileUploadComponent
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: components,
  exports: components
})
export class AngularCommonModule { }
