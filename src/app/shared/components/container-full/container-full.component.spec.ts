import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFullComponent } from './container-full.component';

describe('ContainerFullComponent', () => {
  let component: ContainerFullComponent;
  let fixture: ComponentFixture<ContainerFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
