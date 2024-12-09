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
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { ActiveElement } from 'chart.js/dist/plugins/plugin.tooltip';
import { BarChartData } from '@core/domain/models/reports/bar-chart-data';
import { appRoutes, statsRoutes } from '@helpers/constants/path-rest-constants';

Chart.register(ChartDataLabels);

interface CustomValues {
  backgroundColor: string[];
  data: number[];
}

@Component({
  selector: 'app-graphic-specific-errors',
  templateUrl: './graphic-specific-errors.component.html',
  styleUrls: ['./graphic-specific-errors.component.scss'],
})
export class GraphicSpecificErrorsComponent
  implements OnChanges, AfterViewInit
{
  @ViewChild('ref') chartRef!: ElementRef<HTMLCanvasElement>;
  @Input() data: BarChartData[] = [];
  @Input() title?: string;
  @Input() description?: string;

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
    data.sort((a, b) => b.quantity - a.quantity);

    const dataLabels = [];
    const dataValues = [];
    const dataColors = [];
    for (const model of data) {
      dataValues.push(model.quantity);
      dataLabels.push(model.label);
      dataColors.push('#165BAA');
    }

    // translate the labels if needed
    this.labels = dataLabels.map((label) => this._translate.instant(label));
    this.chartValues = {
      backgroundColor: dataColors,
      data: dataValues,
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
      if (this.chart.options.plugins?.datalabels?.display) {
        const isEmptyData = this.chartValues.data.every((row) => row <= 0);
        this.chart.options.plugins.datalabels.display = !isEmptyData;
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
    const { currentLang } = this._translate;
    const isEmptyData = this.chartValues.data.every((row) => row <= 0);

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.labels ?? [],
        datasets: this.chartValues ? [this.chartValues] : [],
      },
      options: {
        layout: {
          padding: {
            top: 20, // Adiciona espaço extra no topo
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: !isEmptyData,
            anchor: 'end',
            align: 'start',
            offset: -20,
            formatter: (value) =>
              `${value} ${currentLang === 'en' ? 'errors' : 'erros'}`,
            font: {
              size: 14,
              weight: 'bold',
            },
            color: '#000', // Cor dos rótulos
          },
        },
        scales: {
          y: this.getGraphYAxisLimits(),
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
