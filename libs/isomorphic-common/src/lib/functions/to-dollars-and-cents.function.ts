import { toWords } from "./to-words.function";

export function toDollarsAndCents(number: any): string {
    const num = Number(number);
    const decimal = (Math.round((num % 1) * 100)) / 100;
    const int = num - decimal;

    const dollars = `${toWords(int)} dollars`;

    if (!decimal) {
        return dollars;
    }

    return `${dollars} and ${toWords(decimal * 100)} cents`;
}