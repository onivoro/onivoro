#! /usr/bin/env node

const { execSync: x } = require('child_process');

export function concat(output, inputs) {
    x(`ffmpeg -i "concat:${inputs.join('|')}" -c copy ${output}`);
}

export function overlay(output, input1, vol1, input2, vol2) {
    x(`ffmpeg -y -i ${input1} -i ${input2} -filter_complex "[0:0]volume=${vol1}[a];[1:0]volume=${vol2}[b];[a][b]amix=inputs=2:duration=longest" -c:a libmp3lame ${output}`);
}

export function overlayWithLoop(output, input1, vol1, input2, vol2) {
        x(`ffmpeg -i ${input1} -filter_complex "amovie=${input2}:loop=999[s];[0][s]amix=duration=shortest" ${output}`)
}

export function speed(output, input, ratio) {
    x(`ffmpeg -i ${input} -af 'atempo=${ratio}' ${output}`);
}

export function trim(output, input, start, length) {
    x(`ffmpeg -ss ${start} -i ${input} output.mp3`);
}

// speed('vert-8.mp3', 'vert.mp3', '0.8')
concat('pista-long.mp3', ['pista.mp3', 'vert-8.mp3'])
overlay('fire-2.mp3', 'bible.mp3', '1', 'vert-8-long.mp3', '0.26')