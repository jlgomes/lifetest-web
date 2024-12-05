import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'errorDate'
})
export class ErrorDatePipe implements PipeTransform {

  transform(date: string | undefined, type: string): string {
    const errorDate = dayjs(date);
    const hours = errorDate.format('HH');
    const minutes = errorDate.format('MM');
    const sufix = errorDate.format('a'); // AM or PM

    switch (type) {
      case 'time':
        return `${hours}h${minutes}m ${sufix}`;
      case 'date':
        return `${errorDate.format('DD/MM/YYYY')}`;
      default:
        return errorDate.format('');
    }
  }
}
