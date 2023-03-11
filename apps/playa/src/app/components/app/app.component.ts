import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { appRoutes } from '../../app.routes';

@Component({
  selector: 'onivoro-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  routes = appRoutes;

  constructor(private http: HttpClient){}
}
