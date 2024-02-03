import { createReadStream } from "node:fs";
import { mkdir, readFile, rm, rmdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { unzip, writeBufferToDisk, zip } from "@onivoro/server-disk";
import { createWorkingDirectory } from "./create-working-directory.function";
import { extractContentFromDocx } from "./extract-content-from-docx.function";
import { writeContentToDocx } from "./write-content-to-docx.function";
import { execPromise } from "@onivoro/server-process";

export type TExpressFile = {
    originalname: string,
    buffer: any,
    filename: string,
};

export type TDocx = {
    xml: string;
};

export async function docx(docxFilePath: string, callback: (result: TDocx) => Promise<TDocx | undefined | void>) {
    const workingDirectory = randomUUID();

    try {
        await mkdir(workingDirectory, { recursive: true });

        await unzip(docxFilePath, workingDirectory);

        const contentPath = `${workingDirectory}/word/document.xml`

        const xml = await readFile(contentPath, 'utf-8');

        let externalResult: TDocx | undefined | void;

        try {
            externalResult = await callback({ xml });

        } catch (error: any) {
            console.error('docx external callback errored');
        }

        if (externalResult && externalResult.xml) {
            await writeFile(contentPath, externalResult?.xml, 'utf-8');

            await zip(docxFilePath, workingDirectory);
        }

        await rmSafe(workingDirectory);
    } catch (error: any) {
        await rmSafe(workingDirectory);
    }
}

async function rmSafe(dir: string) {
    try {
        // await rm(dir, {recursive: true, force: true});
        await execPromise(`rm -rf "${dir}"`);
    } catch (error: any) {
        console.error(`failed to delete directory "${dir}"`);
    }
}