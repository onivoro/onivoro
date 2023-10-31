export function parseUrl(url?: string) {
    if (url || url === '') {

        if (url === '/' || url === '') {
            return { segments: [''], params: {} };
        }

        const segments = url.split('/').filter(Boolean);
        const params = segments.filter(s => s.includes(':')).reduce((acc, curr) => {
            acc[curr] = '';
            return acc;
        }, {} as any);
        return { segments, params };
    }

    return { segments: [], params: {} };
}