import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app/app.component';
import { LogoComponent } from '../component/logo/logo.component';
import { NavigationComponent } from '../component/navigation/navigation.component';
import { ViewportService } from '../service/viewport.service';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
const imports = [
  BrowserModule,
  MaterialModule,
  AppRoutingModule,
  BrowserAnimationsModule
];
@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    NavigationComponent
  ],
  imports,
  providers: [ViewportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
