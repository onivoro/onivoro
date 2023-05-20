import { utcToZonedTime } from 'date-fns-tz';

export function toLocaleTimeString(d: Date) {
  return utcToZonedTime(d, 'America/New_York')
    .toLocaleTimeString('en-us')
    .replace(/:\d{2}\s{1}/, ' ');
}
