import { concatFiles } from "./concat-files.function";
import { overlay } from "./overlay.function";

const mp3 = '.mp3';
const musicSuffix = 'music_output';

export function bible(musicFiles: string[], bibleTrack: string, loopCount: number, volumeRatio: number, output: string) {
    const musicOutput: string = `${Date.now()}_${musicSuffix}${mp3}`;
    const musicOutputLooped: string = musicOutput.replace(mp3, `_looped${mp3}`);
    concatFiles(musicFiles, musicOutput);
    concatFiles((new Array().fill(loopCount)).map(() => musicOutput), musicOutputLooped);
    overlay(bibleTrack, musicOutputLooped, volumeRatio, output);
}