import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackConfigurationComponent } from './rack-configuration.component';

describe('RackComponent', () => {
  let component: RackConfigurationComponent;
  let fixture: ComponentFixture<RackConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RackConfigurationComponent]
    });
    fixture = TestBed.createComponent(RackConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
