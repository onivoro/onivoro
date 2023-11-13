export function getImagePathByIndex(folder: string, fileNameGenerator: Function, index: number, imageCount: number) {
    const currentIndex = imageCount % index;
    const fileName = fileNameGenerator(currentIndex);
    return `${folder}${fileName}`;
}