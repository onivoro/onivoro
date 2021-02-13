import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { home } from '../constant/links';
import { HomePageComponent } from '../page/home-page/home-page.component';
import { MaterialModule } from './material.module';

const pathMatch = 'full';

const routes: Routes = [
  { path: home.slug, component: HomePageComponent, pathMatch },
  { path: '', redirectTo: home.slug, pathMatch },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule, MaterialModule]
})
export class AppRoutingModule { }
