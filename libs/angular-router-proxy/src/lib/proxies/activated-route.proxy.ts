import { Injectable } from '@angular/core';
import { RouteService } from '../services/route.service';

export class Snapshot {
    get params() {
        return this.routeSvc.params;
    }

    get paramMap() {
        return this.routeSvc.paramMap;
    }

    constructor(private routeSvc: RouteService) { }
}

@Injectable({ providedIn: 'root' })
export class ActivatedRouteProxy {
    snapshot: Snapshot;

    constructor(private routeSvc: RouteService) {
        this.snapshot = new Snapshot(routeSvc);
    }
}