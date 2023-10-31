import { TRouteEnhanced } from '../types/route-enhanced.type';
import { matchRoute } from './match-route.function';
import { enhanceRoutes } from './enhance-routes.function';

const routesEnhanced: TRouteEnhanced[] = enhanceRoutes([
    { path: 'items/:id' },
    { path: '' },
]);

describe('matchRoute', () => {
    it.each([
        [['items/',],],
        [['items',],],
        [['items', '2345'],],
        [['', 'items', '2345'],],
        [['/'],],
        [[''],],
    ])('parses url into segments and param map given url %j', (segments: string[]) => {
        expect(matchRoute(segments, routesEnhanced)).toMatchSnapshot();
    });
});