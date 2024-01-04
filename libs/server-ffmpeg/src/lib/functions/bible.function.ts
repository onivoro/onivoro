import { concatFiles } from "./concat-files.function";
import { overlay } from "./overlay.function";

const mp3 = '.mp3';
const musicSuffix = 'music-output';

export function bible(musicFiles: string[], bibleTrack: string, loopCount: number, volumeRatio: number, output: string) {
    const musicOutput: string = `${new Date().toISOString()}-${musicSuffix}${mp3}`;
    const musicOutputLooped: string = musicOutput.replace(mp3, `-looped${mp3}`);
    concatFiles(musicFiles, musicOutput);
    concatFiles((new Array().fill(loopCount)).map(() => musicOutput), musicOutputLooped);
    overlay(bibleTrack, musicOutputLooped, volumeRatio, output);
}