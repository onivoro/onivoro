import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularCommonModule } from '@onivoro/angular-common';

import { RouterModule } from '@angular/router';
import { appRoutes, defaultRoute } from '../app.routes';
import { MatModule } from './mat.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../components/app/app.component';
import { UploadComponent } from '../components/upload/upload.component';
import { AngularSerializableFormsModule } from 'libs/angular-serializable-forms/src/lib/angular-serializable-forms.module';
import { FormsComponent } from '../components/forms/forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, UploadComponent, FormsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([...appRoutes, defaultRoute], { initialNavigation: 'enabledBlocking' }),
    MatModule,
    AngularCommonModule,
    AngularSerializableFormsModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
