import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from '../app/app.component';
import { home } from '../constant/links';
import { MaterialModule } from './material.module';

const pathMatch = 'full';

const routes: Routes = [
  { path: home.slug, component: AppComponent, pathMatch },
  { path: '', redirectTo: home.slug, pathMatch },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule, MaterialModule]
})
export class AppRoutingModule { }
