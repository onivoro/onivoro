import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

const imports = [
  MatButtonModule
];

@NgModule({
  imports,
  exports: imports
})
export class MatModule {}
