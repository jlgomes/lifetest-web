import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeCalendarComponent } from './datetime-calendar.component';

describe('DatetimeCalendarComponent', () => {
  let component: DatetimeCalendarComponent;
  let fixture: ComponentFixture<DatetimeCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatetimeCalendarComponent]
    });
    fixture = TestBed.createComponent(DatetimeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
