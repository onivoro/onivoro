import { shell } from "@onivoro/server-build";

export function speed(input: string, ratio: number, output: string) {
    shell(`ffmpeg -i ${input} -af 'atempo=${ratio}' ${output}`);
}