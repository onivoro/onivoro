import { Docker } from "./docker";
import { execRx } from "./exec-rx";

const binaryName = 'psql';

export class PSql {
  private container = new Docker(this.containerName, binaryName);
  constructor(public readonly containerName: string) { }

  execRx(cmd: string, db: string, username: string) {
    const dbOptions = db ? ['-d', db] : [];
    const commonArgs = ['-qtAX', '-U', username, ...dbOptions, '-c'].join(' ') + cmd;
    return this.containerName
      ? this.container.execRx(commonArgs)
      : execRx([binaryName, commonArgs].join(' '));
  }
}