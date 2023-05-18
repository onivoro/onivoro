import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

const imports = [
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatToolbarModule
];

@NgModule({
  imports,
  exports: imports
})
export class MatModule {}
