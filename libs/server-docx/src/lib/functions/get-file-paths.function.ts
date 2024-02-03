import { parse } from "node:path";

export function getFilePaths(originalname: string) {
    const name = originalname.replace(/\s+/g, '_');
    const { name: root, ext } = parse(name);
    const inflated = `${root}/inflated`;
    const inputFilePath = `${root}/${name}`;
    const outputFileName = `${root}-modified${ext}`;
    const outputFilePath = `${root}/${outputFileName}`;
    return { root, inflated, outputFilePath, inputFilePath, outputFileName };
}
