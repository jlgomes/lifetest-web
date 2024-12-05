import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'entryDate'
})
export class EntryDatePipe implements PipeTransform {

  transform(date: string | undefined, ...args: unknown[]): string {
    const startDate = dayjs(date);

    return `${startDate.format('DD/MM/YYYY - H')}h`
  }

}
