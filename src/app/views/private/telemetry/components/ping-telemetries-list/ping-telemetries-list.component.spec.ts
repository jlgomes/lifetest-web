import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingTelemetriesListComponent } from './ping-telemetries-list.component';

describe('PingTelemetriesListComponent', () => {
  let component: PingTelemetriesListComponent;
  let fixture: ComponentFixture<PingTelemetriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PingTelemetriesListComponent]
    });
    fixture = TestBed.createComponent(PingTelemetriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
