import { MILLIS_PER_MINUTE } from '../constants/millis-per-minute.constant';
import { tryParseDate } from './try-parse-date.function';

export function addOffset(allegedDate: string | Date | undefined): Date | undefined {
    const parsed = tryParseDate(allegedDate);

    if(!parsed) {
        return;
    }

    const offset = (new Date()).getTimezoneOffset();

    return new Date(parsed.valueOf() + offset * MILLIS_PER_MINUTE);
}
