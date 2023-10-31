import { Route } from '@angular/router';
import { TRouteEnhanced } from '../types/route-enhanced.type';
import { parseUrl } from './parse-url.function';

export function enhanceRoutes(routes: Route[]): TRouteEnhanced[] {
    return routes.map(r => ({ ...r, ...parseUrl(r.path) }));
}
