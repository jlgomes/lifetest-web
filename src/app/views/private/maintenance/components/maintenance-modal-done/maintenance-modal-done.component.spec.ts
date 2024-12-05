import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceModalDoneComponent } from './maintenance-modal-done.component';

describe('MaintenanceModalDoneComponent', () => {
  let component: MaintenanceModalDoneComponent;
  let fixture: ComponentFixture<MaintenanceModalDoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceModalDoneComponent]
    });
    fixture = TestBed.createComponent(MaintenanceModalDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
