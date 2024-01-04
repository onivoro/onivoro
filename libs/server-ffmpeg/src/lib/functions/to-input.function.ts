export function toInput(files: string[]) {
    return files.map(file => `-i ${file}`).join(' ');
}
