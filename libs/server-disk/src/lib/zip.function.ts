import { execPromise } from '@onivoro/server-process';

export async function zip(outputFileName: string, cwd: string) {
    await execPromise(`zip -r -X "${outputFileName}" *`, { cwd });
}