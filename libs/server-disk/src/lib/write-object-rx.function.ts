import { writeFileRx } from './write-file-rx.function'

export const writeObjectRx = (path: string, data: any) => {
  return writeFileRx(path, JSON.stringify(data, null, 2));
}
