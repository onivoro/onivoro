import { writeFile } from "node:fs/promises";
import { execPromise } from '@onivoro/server-process';

export async function writeContentToDocx(
    contentPath: string,
    updatedContent: any,
    inflated: string,
    outputFileName: string
) {
    await writeFile(contentPath, updatedContent, 'utf-8');

    const newFile = `${inflated}/${outputFileName}`;

    await execPromise(`zip -r -X "${outputFileName}" *`, { cwd: inflated });

    return newFile;
}