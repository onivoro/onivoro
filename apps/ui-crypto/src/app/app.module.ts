import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTailwindComponentsModule } from '@onivoro/angular-tailwind-components';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';

const pathMatch = 'full';

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    AngularTailwindComponentsModule,
    RouterModule.forRoot([{
      component: HomePageComponent,
      path: '',
      pathMatch
    }], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
