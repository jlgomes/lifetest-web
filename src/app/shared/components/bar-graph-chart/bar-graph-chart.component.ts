import Chart from 'chart.js/auto';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { BarChartData } from '@core/domain/models/reports/bar-chart-data';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { ActiveElement } from 'chart.js/dist/plugins/plugin.tooltip';
import { appRoutes, statsRoutes } from '@helpers/constants/path-rest-constants';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface CustomValues {
  backgroundColor: string[];
  data: number[];
  datalabels?: Object;
}

@Component({
  selector: 'app-bar-graph-chart',
  templateUrl: './bar-graph-chart.component.html',
  styleUrls: ['./bar-graph-chart.component.scss'],
})
export class BarGraphChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('ref') chartRef!: ElementRef<HTMLCanvasElement>;
  @Input() data: BarChartData[] = [];
  @Input() title?: string;
  @Input() description?: string;
  @Input() canvasId?: string;

  protected chart!: Chart;
  protected chartValues!: CustomValues;
  protected labels: string[] = [];
  protected minValue: number = 0;
  protected maxValue: number = 100;

  constructor(
    private _translate: TranslateService,
    private _router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.createChart();
    // this is needed because the DOM is changed after being rendered, this forces an update
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if new data comes from the API
    if (changes['data']) {
      this.processData(this.data);
      this.drawChart();
    }
  }

  private processData(data: BarChartData[]) {
    const dataLabels = [];
    const dataValues = [];
    const dataColors = [];
    for (const model of data) {
      dataValues.push(model.quantity);
      dataLabels.push(model.label);
      dataColors.push(model.color);
    }

    // translate the labels if needed
    this.labels = dataLabels.map((label) => this._translate.instant(label));
    this.chartValues = {
      backgroundColor: dataColors,
      data: dataValues,
      datalabels: {
        color: 'white',
        anchor: 'end',
        font: {
          weight: 'bold',
          size: 30,
        },
        align: 'start',
      },
    };

    this.minValue = Math.min(...this.chartValues.data);
    this.maxValue = Math.max(...this.chartValues.data);
  }

  private getGraphYAxisLimits() {
    // if a the minimum value column begin at its value, no bar is shown
    // a margin makes the graph start a little below the minimum value
    const margin: number = 0.1;
    return {
      min: Math.floor(this.minValue - margin * this.minValue),
      max: this.maxValue,
    };
  }

  private drawChart() {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets = [this.chartValues];
      if (this.chart?.options?.scales?.['y']) {
        this.chart.options.scales['y'] = this.getGraphYAxisLimits();
      }
      this.chart.update();
    }
  }

  private onBarClick(event: ChartEvent, elements: ActiveElement[]) {
    if (elements.length <= 0) {
      console.warn('No element found in chart');
      return;
    }

    const element: ActiveElement = elements[0];
    const index: number = element.index;
    const label: string = this.labels[index];

    this._router.navigate([appRoutes.DASHBOARD, statsRoutes.DETAILED_VIEW], {
      queryParams: { label },
    });

    console.log({
      element,
      label,
      data: this.chartValues,
      event,
    });
  }

  private createChart() {
    const config: ChartConfiguration = {
      type: 'bar',
      plugins: [ChartDataLabels],
      data: {
        labels: this.labels ?? [],
        datasets: this.chartValues ? [this.chartValues] : [],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: this.getGraphYAxisLimits(),
          x: {
            ticks: {
              color: 'black',
              font: {
                weight: 'bold',
                size: 18,
              },
            },
          },
        },
        onClick: (event, elements) => {
          this.onBarClick(event, elements);
        },
      },
    };

    const context = this.chartRef.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    this.chart = new Chart(context, config);
  }
}
