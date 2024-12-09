import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import dayjs from 'dayjs';

export interface DateInterval {
  start: Date | null;
  end: Date | null;
}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-br' }],
})
export class DatePickerComponent {
  protected timeframe: FormGroup;

  @Input() hideHint?: boolean = false;
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

  clearValue() {
    this.timeframe.reset();
    this.onChange();
  }

  onChange() {
    this.onSelectionChange.emit(this.timeframe.value);
  }
}
