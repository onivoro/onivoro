import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { home, packages } from '../constant/links';
import { HomePageComponent } from '../page/home-page/home-page.component';
import { PackagePageComponent } from '../page/package-page/package-page.component';
import { MaterialModule } from './material.module';

const pathMatch = 'full';

const routes: Routes = [
  { path: packages.slug, component: PackagePageComponent, pathMatch },
  { path: home.slug, redirectTo: '', pathMatch },
  { path: '', component: HomePageComponent, pathMatch },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule, MaterialModule]
})
export class AppRoutingModule { }
