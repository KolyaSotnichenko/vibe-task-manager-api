import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  getCurrentTime(timezone?: string): { timezone: string; iso: string; timestamp: number } {
    const tz = timezone ?? 'America/New_York';
    let date: Date;
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour12: false,
      });
      formatter.format(new Date());
      date = new Date();
    } catch {
      throw new BadRequestException({ error: 'Invalid timezone', code: 'INVALID_TIMEZONE' });
    }
    const iso = new Date(date.toLocaleString('en-US', { timeZone: tz })).toISOString();
    return { timezone: tz, iso, timestamp: Date.parse(iso) };
  }
}
