import { TRouteEnhanced } from "../types/route-enhanced.type";

export function matchRoute(rawSegments: string[], routesEnhanced: TRouteEnhanced[]) {
    const params: Record<string, any> = {};
    const segments = rawSegments.filter(Boolean);

    const route = routesEnhanced
        .filter(re => segments.length === re.segments.length)
        .filter(re => segments.every((s, i) => (s.replace('/', '') === re.segments[i]) || (re.segments[i].includes(':'))))[0];

    if (route) {
        route.segments.forEach((s, i) => {
            if (s.includes(':')) {
                params[s.replace(':', '')] = segments[i];
            }
        });
    }

    return { route, params };
}
