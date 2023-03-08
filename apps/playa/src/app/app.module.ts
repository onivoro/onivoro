import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularCommonModule } from '@onivoro/angular-common';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    MatModule,
    AngularCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
