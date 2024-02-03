import { execPromise } from "@onivoro/server-process";

export async function unzip(inputFilePath: string, inflated: string) {
    await execPromise(`unzip -u "${inputFilePath}" -d "${inflated}"`);
}