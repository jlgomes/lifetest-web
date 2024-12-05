import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalTreeComponent } from './profile-modal-tree.component';

describe('ProfileModalTreeComponent', () => {
  let component: ProfileModalTreeComponent;
  let fixture: ComponentFixture<ProfileModalTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileModalTreeComponent]
    });
    fixture = TestBed.createComponent(ProfileModalTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
