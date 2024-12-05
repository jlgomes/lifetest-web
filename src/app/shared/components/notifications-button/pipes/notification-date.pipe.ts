import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'notificationDate',
  standalone: true
})
export class NotificationDatePipe implements PipeTransform {

  transform(date: string | undefined, type: string): string {
    const errorDate = dayjs(date);
    const hours = errorDate.format('HH');
    const minutes = errorDate.format('MM');
    const suffix = errorDate.format('a'); // AM or PM

    switch (type) {
      case 'time':
        return `${hours}h${minutes}m ${suffix}`;
      case 'date':
        return `${errorDate.format('DD/MM/YYYY')}`;
      case 'date-header': {
        const today = dayjs();
        const yesterday = today.subtract(1, 'day');

        if (errorDate.isSame(today, 'day')) {
          return 'notifications.today';
        } else if (errorDate.isSame(yesterday, 'day')) {
          return 'notifications.yesterday';
        } else {
          return errorDate.format('MM/DD/YYYY');
        }
      }

      default:
        return errorDate.format('');
    }
  }
}



