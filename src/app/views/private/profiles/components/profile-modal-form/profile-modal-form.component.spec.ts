import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalFormComponent } from './profile-modal-form.component';

describe('ProfileModalFormComponent', () => {
  let component: ProfileModalFormComponent;
  let fixture: ComponentFixture<ProfileModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileModalFormComponent]
    });
    fixture = TestBed.createComponent(ProfileModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
