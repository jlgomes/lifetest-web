import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceRegistersComponent } from './maintenance-registers.component';

describe('MaintenanceRegistersComponent', () => {
  let component: MaintenanceRegistersComponent;
  let fixture: ComponentFixture<MaintenanceRegistersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceRegistersComponent]
    });
    fixture = TestBed.createComponent(MaintenanceRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
