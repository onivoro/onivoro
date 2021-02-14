import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../component/app/app.component';
import { LogoComponent } from '../component/logo/logo.component';
import { NavigationComponent } from '../component/navigation/navigation.component';
import { HomePageComponent } from '../page/home-page/home-page.component';
import { PackagePageComponent } from '../page/package-page/package-page.component';
import { ViewportService } from '../service/viewport.service';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
const components = [AppComponent,
  LogoComponent,
  NavigationComponent
];

const pages = [
  HomePageComponent,
  PackagePageComponent
];
@NgModule({
  declarations: [
    ...components,
    ...pages
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [ViewportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
