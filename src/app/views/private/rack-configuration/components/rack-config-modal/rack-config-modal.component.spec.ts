import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackConfigModalComponent } from './rack-config-modal.component';

describe('RackConfigModalComponent', () => {
  let component: RackConfigModalComponent;
  let fixture: ComponentFixture<RackConfigModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RackConfigModalComponent]
    });
    fixture = TestBed.createComponent(RackConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
