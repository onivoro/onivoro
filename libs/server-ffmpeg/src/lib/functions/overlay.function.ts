import { shell } from "@onivoro/server-build";
import { toInput } from "./to-input.function";

export function overlay(primaryFile: string, secondaryFile: string, volumeRatio: number, output: string) {
    shell(`ffmpeg ${toInput([primaryFile, secondaryFile])} -filter_complex "[0:a]volume=1[a0];[1:a]volume=${volumeRatio}[a1];[a0][a1]amix=inputs=2[aout]" -map "[aout]" ${output}`);
}