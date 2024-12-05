import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '@core/domain/services/language.service';
import dayjs from 'dayjs';

@Pipe({
  name: 'totalDate'
})
export class TotalDatePipe implements PipeTransform {
  constructor(private _languageService: LanguageService) { }

  transform(date: string, numberOfDays: number): string {
    const startDate = dayjs(date);
    const finalDate = dayjs(date).add(numberOfDays, 'days');

    const hoursPassed = finalDate.diff(startDate, 'hour');
    const daysPassed = finalDate.diff(startDate, 'days');

    return `${hoursPassed}h - ${daysPassed} ${this._languageService.getDaysSuffix(daysPassed)}`
  }

}
