import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'datetime',
  standalone: true,
})
export class DatetimePipe implements PipeTransform {
  transform(date: string | undefined, ...args: unknown[]): string {
    let mask = 'DD/MM/YYYY HH:mm:ss';

    if (args.length) mask = args[0] as string;

    const formatedDate = dayjs(date).format(mask);

    return formatedDate;
  }
}
