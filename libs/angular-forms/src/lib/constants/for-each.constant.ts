export const forEach = (o: any, fn: Function) => Object.keys(o).forEach((k, i) => fn(o[k], k, i));