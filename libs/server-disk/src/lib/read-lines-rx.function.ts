import { map } from 'rxjs/operators';
import { readFileRx } from './read-file-rx.function';

export const readLinesRx = (path: string) => readFileRx(path).pipe(map(file => file.split('\n')));