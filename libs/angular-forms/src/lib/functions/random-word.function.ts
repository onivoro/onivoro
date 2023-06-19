export function randomWord() {
    return Math.random()
        .toString()
        .split('.')[1]
        .split('')
        .map(Number)
        .map(num => String.fromCharCode((num + 65)))
        .join('');
}