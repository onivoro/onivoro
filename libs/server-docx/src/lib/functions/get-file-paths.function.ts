import { parse } from "node:path";

export function getFilePaths(originalname: string, cwd?: string) {
    const name = originalname.replace(/\s+/g, '_');
    const { name: root, ext } = parse(name);
    const inflated = `${root}/inflated`;
    const inputFilePath = `${root}/${name}`;
    const outputFileName = `${root}-modified${ext}`;
    const outputFilePath = `${inflated}/${outputFileName}`;
    const contentPath = `${inflated}/word/document.xml`;

    return cwd
        ? {
            root: `${cwd}/${root}`,
            inflated: `${cwd}/${inflated}`,
            outputFilePath: `${cwd}/${outputFilePath}`,
            inputFilePath: `${cwd}/${inputFilePath}`,
            outputFileName: `${cwd}/${outputFileName}`,
            contentPath: `${cwd}/${contentPath}`
        }
        : { root, inflated, outputFilePath, inputFilePath, outputFileName, contentPath };
}
