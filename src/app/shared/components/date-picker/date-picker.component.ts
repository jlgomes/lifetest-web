import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import dayjs from 'dayjs';

export interface DateInterval {
  start: string;
  end: string;
}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-br' }],
})
export class DatePickerComponent {
  protected timeframe: FormGroup;
  @Output() onSelectionChange = new EventEmitter<DateInterval>();

  constructor(
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>
  ) {
    _locale = 'pt-br';
    _adapter.setLocale(this._locale);

    const today = dayjs();
    const lastWeek = today.subtract(1, 'week');

    this.timeframe = new FormGroup({
      start: new FormControl(
        new Date(lastWeek.year(), lastWeek.month(), lastWeek.date())
      ),
      end: new FormControl(new Date(today.year(), today.month(), today.date())),
    });
  }

  onChange(event: MatDatepickerInputEvent<any>) {
    this.onSelectionChange.emit(this.timeframe.value);
  }
}
