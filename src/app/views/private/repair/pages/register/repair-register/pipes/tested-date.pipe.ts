import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '@core/domain/services/language.service';
import dayjs from 'dayjs';

@Pipe({
  name: 'testedDate'
})
export class TestedDatePipe implements PipeTransform {
  constructor(private _languageService: LanguageService) { }

  transform(date: string | undefined, ...args: unknown[]): string {
    const startDate = dayjs(date);
    const currentDate = dayjs();
    const hoursPassed = currentDate.diff(startDate, 'hour');
    const daysPassed = currentDate.diff(startDate, 'days') + 1;

    return `${hoursPassed}h - ${this._languageService.getOrdinalDays(daysPassed)}`
  }

}
