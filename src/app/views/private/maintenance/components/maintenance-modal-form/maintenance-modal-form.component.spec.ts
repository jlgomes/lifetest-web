import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceModalFormComponent } from './maintenance-modal-form.component';

describe('MaintenanceModalFormComponent', () => {
  let component: MaintenanceModalFormComponent;
  let fixture: ComponentFixture<MaintenanceModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceModalFormComponent]
    });
    fixture = TestBed.createComponent(MaintenanceModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
