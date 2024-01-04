import { shell } from "@onivoro/server-build";

export function convert(inputFileAndExtension: string, outputFileAndExtension: string) {
    shell(`ffmpeg -i ${outputFileAndExtension} ${outputFileAndExtension}`);
}