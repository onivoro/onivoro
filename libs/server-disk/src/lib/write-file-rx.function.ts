import { writeFile } from 'fs';
import { Subject } from 'rxjs';

export const writeFileRx = (path: string, data: any) => {
    const s = new Subject();
    writeFile(path, data, {encoding: 'utf8'}, err => {
        if (err) {
            s.error(err);
        } else {
            s.next(data);
            s.complete();
        }
    });

    return s.asObservable();
};