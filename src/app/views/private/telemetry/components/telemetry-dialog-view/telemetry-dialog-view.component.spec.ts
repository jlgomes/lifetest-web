import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryDialogViewComponent } from './telemetry-dialog-view.component';

describe('TelemetryDialogViewComponent', () => {
  let component: TelemetryDialogViewComponent;
  let fixture: ComponentFixture<TelemetryDialogViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelemetryDialogViewComponent]
    });
    fixture = TestBed.createComponent(TelemetryDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
