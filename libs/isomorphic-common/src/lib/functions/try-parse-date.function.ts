export function tryParseDate(allegedDate: string | Date | undefined): Date | undefined {
    if (!allegedDate) {
        return undefined;
    }

    if(allegedDate instanceof Date) {
        return allegedDate;
    }

    const date = new Date(allegedDate);

    if ((date as any) == 'Invalid Date') {
        return undefined;
    }

    return date;
}
