import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '@core/domain/services/language.service';
import dayjs from 'dayjs';

@Pipe({
  name: 'totalDate'
})
export class TotalDatePipe implements PipeTransform {
  constructor(private _languageService: LanguageService) { }

  transform(date1: string | undefined, date2: string | undefined): string {
    const startDate = dayjs(date1);
    const finalDate = dayjs(date2)

    const hoursPassed = finalDate.diff(startDate, 'hour');
    const daysPassed = finalDate.diff(startDate, 'days');

    return `${hoursPassed}h - ${daysPassed} ${this._languageService.getDaysSuffix(daysPassed)}`
  }

}
