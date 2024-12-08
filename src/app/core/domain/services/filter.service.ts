import { Injectable } from '@angular/core';
import { DateInterval } from '@shared/components/date-picker/date-picker.component';
import dayjs from 'dayjs';
import { PageRequestForm } from '../forms/page-request-form';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  getIntervalInitial(): DateInterval {
    const today = dayjs();
    const lastWeek = today.subtract(1, 'week');

    return {
      end: today.toDate(),
      start: lastWeek.toDate(),
    };
  }

  setIntervalInitial(pageable: PageRequestForm) {
    const { start, end } = this.getIntervalInitial();
    pageable.endDate = end?.toUTCString();
    pageable.startDate = start?.toUTCString();
  }

  onChangeInterval(
    pageable: PageRequestForm,
    value: Partial<DateInterval>,
    fetchCallback: () => void
  ) {
    pageable.startDate = value.start?.toUTCString();
    pageable.endDate = value.end?.toUTCString();
    fetchCallback();
  }

  onChangeTime(
    pageable: PageRequestForm,
    key: 'startTime' | 'endTime',
    value: string,
    fetchCallback: () => void
  ) {
    pageable[key] = value;
    this.refetchChangeTime(value, fetchCallback);
  }

  private refetchChangeTime(value: string, fetchCallback: () => void) {
    const isFilled = value.length > 4;
    const isEmpty = value.length === 0;

    if (isEmpty || isFilled) {
      fetchCallback();
    }
  }
}
