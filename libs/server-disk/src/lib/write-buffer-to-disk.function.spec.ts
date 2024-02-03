import { readFile, rm } from 'node:fs/promises';
import { writeBufferToDisk } from './write-buffer-to-disk.function';
import { existsSync } from 'node:fs';

describe('writeBufferToDisk', () => {
  it('worx', async () => {
    const where = 'test/test.txt';

    // precondition
    expect(existsSync(where)).toBe(false);

    // execution and assertion
    const buffer = Buffer.from(where);
    await writeBufferToDisk(where, { buffer });
    expect(existsSync(where)).toBe(true);
    expect(await readFile(where, { encoding: 'utf-8' })).toEqual(where);

    // teardown
    await rm(where);
  });
});