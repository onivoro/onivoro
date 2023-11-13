export function getImagePath (pathFun: Function, index: number, padLength: number) {
    return `${pathFun(index.toString().padStart(padLength, '0'))}`;
};