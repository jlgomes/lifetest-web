import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicSpecificErrorsComponent } from './graphic-specific-errors.component';

describe('MostTestedModelsChartComponent', () => {
  let component: GraphicSpecificErrorsComponent;
  let fixture: ComponentFixture<GraphicSpecificErrorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicSpecificErrorsComponent],
    });
    fixture = TestBed.createComponent(GraphicSpecificErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
