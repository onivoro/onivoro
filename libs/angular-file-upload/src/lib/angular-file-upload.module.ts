import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const declarations = [FileUploadComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatListModule],
  declarations,
  exports: declarations

})
export class AngularFileUploadModule { }
