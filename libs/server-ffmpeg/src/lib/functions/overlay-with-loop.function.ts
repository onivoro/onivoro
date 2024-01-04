import { shell } from "@onivoro/server-build";

export function overlayWithLoop(input1: string, vol1: number, input2: string, vol2: number, output: string) {
    shell(`ffmpeg -i ${input1} -filter_complex "amovie=${input2}:loop=999[s];[0][s]amix=duration=shortest" ${output}`)
}