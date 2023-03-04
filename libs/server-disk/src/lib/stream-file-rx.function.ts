import { createReadStream } from 'fs';
import * as readline from 'readline';
import { Observable } from 'rxjs';

export function streamFileRx(path: string, enc) {
  return new Observable<string>(o => {
    const readInterface = readline.createInterface({
      input: createReadStream(path, enc),
      output: process.stdout,
      terminal: false
    });

    readInterface.on('line', line => o.next(line));
    readInterface.on('error', e => o.error(e));
    readInterface.on('close', () => o.complete());

    function tearDownLogic() {
      readInterface.close();
    }

    return tearDownLogic;
  });
}
