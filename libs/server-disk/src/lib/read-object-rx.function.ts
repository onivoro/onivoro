import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { readFileRx } from './read-file-rx.function';

export const readObjectRx = (path: string) => {
  return readFileRx(path)
    .pipe(
      map((data) => JSON.parse(data)),
      catchError(e => of(`cannot read ${path}: ${e.stack}`))
    );
}
