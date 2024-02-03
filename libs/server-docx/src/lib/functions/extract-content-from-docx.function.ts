import { readFile } from "node:fs/promises";
import { getFilePaths } from "./get-file-paths.function";
import { execPromise } from '@onivoro/server-process';

export async function extractContentFromDocx(originalname: string) {
    const { inflated, inputFilePath } = getFilePaths(originalname);
    await execPromise(`unzip -u "${inputFilePath}" -d "${inflated}"`);
    const contentPath = `${inflated}/word/document.xml`;
    const content = await readFile(contentPath, 'utf-8');
    return { content, contentPath };
}