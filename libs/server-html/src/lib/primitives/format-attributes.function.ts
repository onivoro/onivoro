export function formatAttributes(attributes: Record<string, any>) {
    return Object.entries(attributes)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
}
