import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphChartComponent } from './bar-graph-chart.component';

describe('MostTestedModelsChartComponent', () => {
  let component: BarGraphChartComponent;
  let fixture: ComponentFixture<BarGraphChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarGraphChartComponent]
    });
    fixture = TestBed.createComponent(BarGraphChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
