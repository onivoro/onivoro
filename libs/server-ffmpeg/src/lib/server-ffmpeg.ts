import {shell} from '@onivoro/server-build';

export function concat(output, inputs) {
    shell(`ffmpeg -i "concat:${inputs.join('|')}" -c copy ${output}`);
}

export function overlay(output, input1, vol1, input2, vol2) {
    shell(`ffmpeg -y -i ${input1} -i ${input2} -filter_complex "[0:0]volume=${vol1}[a];[1:0]volume=${vol2}[b];[a][b]amix=inputs=2:duration=longest" -c:a libmp3lame ${output}`);
}

export function overlayWithLoop(output, input1, vol1, input2, vol2) {
    shell(`ffmpeg -i ${input1} -filter_complex "amovie=${input2}:loop=999[s];[0][s]amix=duration=shortest" ${output}`)
}

export function speed(output, input, ratio) {
    shell(`ffmpeg -i ${input} -af 'atempo=${ratio}' ${output}`);
}

export function trim(output, input, start, length) {
    shell(`ffmpeg -ss ${start} -i ${input} output.mp3`);
}

export function convert(inputFileAndExtension: string, outputFileAndExtension: string) {
    shell(`ffmpeg -i ${outputFileAndExtension} ${outputFileAndExtension}`);
}

// speed('vert-8.mp3', 'vert.mp3', '0.8')
// concat('pista-long.mp3', ['pista.mp3', 'vert-8.mp3'])
// overlay('fire-2.mp3', 'bible.mp3', '1', 'vert-8-long.mp3', '0.26')


const musicFiles = [
    'fall.mp3',
    '777.mp3',
    '200mph.mp3',
    'booker.mp3',
    'fall.mp3',
    'ni.mp3',
    '100x35.mp3',
    'lock.mp3',
    'ni.mp3',
    'fall.mp3',
];

const musicOuput = 'audio.mp3';
const longMusicOutput = `long-${musicOuput}`;
const desired_duration = '6780';
const finishedOutput = 'fire.mp3';

const loopedMusicFiles = [musicOuput, musicOuput, musicOuput];

// shell(`ffmpeg ${toInput(musicFiles)} -filter_complex "${toChannels(musicFiles)}concat=n=${musicFiles.length}:v=0:a=1[out]" -map "[out]" ${musicOuput}`);
// shell(`ffmpeg ${toInput(loopedMusicFiles)} -filter_complex "${toChannels(loopedMusicFiles)}concat=n=${loopedMusicFiles.length}:v=0:a=1[out]" -map "[out]" ${longMusicOutput}`);
// shell(`ffmpeg ${toInput([musicOuput])} -filter_complex "[0:a]aloop=loop=-1:size=${desired_duration*1000}[out]" -map "[out]" -t ${desired_duration} ${longMusicOutput}`);
shell(`ffmpeg ${toInput(['bible.mp3', longMusicOutput])} -filter_complex "[0:a]volume=1[a0];[1:a]volume=0.3[a1];[a0][a1]amix=inputs=2[aout]" -map "[aout]" ${finishedOutput}`);


function toInput(files) {
    return files.map(file => `-i ${file}`).join(' ');
}


function toChannels(files) {
    return files.map((file, i) => `[${i}:0]`).join('')
}
