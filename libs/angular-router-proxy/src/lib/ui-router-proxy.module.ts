import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterOutletComponent } from './components/router-outlet.component';
import { RouterUrlComponent } from './components/router-url.component';
import { RouteService } from './services/route.service';
import { RouterOutletDirective } from './directives/router-outlet.directive';
import { ActivatedRouteProxy } from './proxies/activated-route.proxy';
import { RouterProxy } from './proxies/router.proxy';
import { BrowserModule } from '@angular/platform-browser';

let routeService: RouteService | null;

const components = [
  RouterOutletComponent,
  RouterUrlComponent
];

const directives = [
  RouterOutletDirective
];

const declarations = [...components, ...directives];

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations,
  providers: [
    {
      provide: ActivatedRoute,
      useClass: ActivatedRouteProxy
    },
    {
      provide: Router,
      useClass: RouterProxy
    },
  ],
  exports: declarations,
})
export class UiRouterProxyModule {
  static forRoot(routes: Routes) {
    return {
      ngModule: UiRouterProxyModule,
      providers: [
        {
          provide: RouteService,
          useFactory: () => {
            if (routeService) {
              return routeService;
            }

            routeService = new RouteService();
            routeService.routes = routes;

            return routeService;
          }
        },
      ],
      exports: declarations
    };
  }
}
