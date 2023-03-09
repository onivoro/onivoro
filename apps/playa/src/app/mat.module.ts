import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const imports = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports,
  exports: imports
})
export class MatModule {}
