import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { TRouteEnhanced } from '../types/route-enhanced.type';
import { enhanceRoutes } from '../functions/enhance-routes.function';
import { matchRoute } from '../functions/match-route.function';

@Injectable()
export class RouteService {
    routes: Routes;
    routesEnhanced: Array<TRouteEnhanced>;
    initialized = false;

    url$$ = new BehaviorSubject<string>('');
    url$ = this.url$$.asObservable().pipe(shareReplay());

    route$$ = new BehaviorSubject<TRouteEnhanced | null>(null);
    route$ = this.route$$.asObservable().pipe(shareReplay());

    params$$ = new BehaviorSubject<Record<string, any>>({});
    params$ = this.params$$.asObservable().pipe(shareReplay());

    component$$ = new BehaviorSubject<any>(null);
    component$ = this.component$$.asObservable().pipe(shareReplay());

    private _params: Record<string, any> = {};
    private _paramMap = new Map();

    get params() {
        return this._params;
    }

    get paramMap() {
        return this._paramMap;
    }

    set params(value: Record<string, any>) {
        Object.entries(value || {})
            .forEach(([key, valueForKey]) => {
                this._params[key] = valueForKey;
                this._paramMap.set(key, valueForKey);
            });
    }

    init() {
        if (!this.initialized) {
            this.initialized = true;
            this.routesEnhanced = enhanceRoutes(this.routes);
            this.load(this.routesEnhanced?.find(r => r.path === '') || this.routesEnhanced[0], '', {});
        }
    }

    load(route: TRouteEnhanced, url: string, params?: Record<string, any>) {
        this.params = params || {};
        this.params$$.next(this.params);
        this.component$$.next(route.component);
        this.url$$.next(url);
        this.route$$.next(route as any);
    }

    navigate(segments: string[]) {
        const { params, route } = matchRoute(segments, this.routesEnhanced);
        this.load(route, segments.join('/'), params);
    }

    navigateByUrl(url: string) {
        this.navigate(url.split('/'));
    }
}