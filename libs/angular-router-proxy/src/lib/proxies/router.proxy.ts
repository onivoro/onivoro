import { Injectable } from '@angular/core';
import { RouteService } from '../services/route.service';

@Injectable({ providedIn: 'root' })
export class RouterProxy {
    constructor(private routerSvc: RouteService) { }
    navigate = this.routerSvc.navigate.bind(this.routerSvc);
    navigateByUrl = this.routerSvc.navigateByUrl.bind(this.routerSvc);
}