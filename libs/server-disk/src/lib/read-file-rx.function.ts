import { readFile } from 'fs';
import { Subject } from 'rxjs';

export const readFileRx = (path: string) => {
    const s = new Subject<string>();

    readFile(path, {encoding: 'utf8'}, (err, data) => {
        if (err) {
            s.error(err);
        } else {
            if (data) {
                s.next(data as string);
            }
            s.complete();
        }
    });

    return s.asObservable();
};