import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEventDialogViewComponent } from './log-event-dialog-view.component';

describe('LogEventDialogViewComponent', () => {
  let component: LogEventDialogViewComponent;
  let fixture: ComponentFixture<LogEventDialogViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogEventDialogViewComponent]
    });
    fixture = TestBed.createComponent(LogEventDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
