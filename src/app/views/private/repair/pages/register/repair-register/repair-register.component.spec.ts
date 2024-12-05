import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairRegisterComponent } from './repair-register.component';

describe('RepairRegisterComponent', () => {
  let component: RepairRegisterComponent;
  let fixture: ComponentFixture<RepairRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepairRegisterComponent]
    });
    fixture = TestBed.createComponent(RepairRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
