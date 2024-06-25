import { format, toZonedTime} from 'date-fns-tz';

const timeZone = 'America/New_York';

// 現在の日付をフォーマットして返す関数
export function getCurrentDateFormatted(): string {
    const now = new Date();
    const zonedDate = toZonedTime(now, timeZone);
    return format(zonedDate, 'yyyy-MM-dd');
}

// 指定した日付をタイムゾーンに変換して返す関数
export function getZonedDate(date: Date): Date {
    const zonedDate = toZonedTime(date, timeZone);
    return zonedDate;
}

// 指定した日付を指定したフォーマットでフォーマットして返す関数
export function formatZonedDate(date: Date, formatString: string): string {
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, formatString);
}
