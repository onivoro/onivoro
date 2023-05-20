import { utcToZonedTime } from 'date-fns-tz';

export function toLocaleDateString(d: Date) {
  return utcToZonedTime(d, 'America/New_York').toLocaleDateString('en-us');
}
