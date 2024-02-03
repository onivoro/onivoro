import { readFile } from "node:fs/promises";
import { getFilePaths } from "./get-file-paths.function";
import { execPromise } from '@onivoro/server-process';

export async function extractContentFromDocx(originalname: string) {
    const paths = getFilePaths(originalname);
    await execPromise(`unzip -u "${paths.inputFilePath}" -d "${paths.inflated}"`);
    const content = await readFile(paths.contentPath, 'utf-8');
    return { ...paths, content };
}