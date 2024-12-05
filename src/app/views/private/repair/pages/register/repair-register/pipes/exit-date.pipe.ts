import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'exitDate'
})
export class ExitDatePipe implements PipeTransform {

  transform(date: string | undefined, ...args: unknown[]): string {
    const endDate = dayjs(date);

    return `${endDate.format('DD/MM/YYYY - H')}h`
  }

}
