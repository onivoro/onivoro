export function toChannels(files: string[]) {
    return files.map((file, i) => `[${i}:0]`).join('')
}
