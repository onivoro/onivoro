export function replaceWhiteWithClear(red: number, blue: number, green: number, alpha: number) {
    if (red === 255 && green === 255 && blue === 255) {
        return {
            red: 0, blue: 0, green: 0, alpha
        }
    }
    return {
        red,
        blue,
        green,
        alpha
    };
}
