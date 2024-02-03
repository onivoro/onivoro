import { createReadStream, createWriteStream } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function writeBufferToDisk(inputFilePath: string, file: {buffer: Buffer}) {
    const ws = createWriteStream(inputFilePath);
    ws.write(file.buffer);
    const closed = new Promise((r) => ws.on('close', r));
    ws.close();
    await closed;
  }