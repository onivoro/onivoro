import { shell } from "@onivoro/server-build";
import { toChannels } from "./to-channels.function";
import { toInput } from "./to-input.function";

export function concatFiles(musicFiles: string[], musicOuput: string) {
    shell(`ffmpeg ${toInput(musicFiles)} -filter_complex "${toChannels(musicFiles)}concat=n=${musicFiles.length}:v=0:a=1[out]" -map "[out]" ${musicOuput}`);
}