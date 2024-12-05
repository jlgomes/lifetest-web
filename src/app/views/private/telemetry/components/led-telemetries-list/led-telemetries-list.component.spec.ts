import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedTelemetriesListComponent } from './led-telemetries-list.component';

describe('LedTelemetriesListComponent', () => {
  let component: LedTelemetriesListComponent;
  let fixture: ComponentFixture<LedTelemetriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LedTelemetriesListComponent]
    });
    fixture = TestBed.createComponent(LedTelemetriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
