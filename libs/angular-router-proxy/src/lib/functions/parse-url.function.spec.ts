import { parseUrl } from './parse-url.function';

describe('parseUrl', () => {
    it.each([
        'items/',
        'items',
        'items/:id',
        '/',
        '',
    ])('parses url into segments and param map given url %j', (url: string) => {
        expect(parseUrl(url)).toMatchSnapshot();
    });
});