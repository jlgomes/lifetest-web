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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TranslateService } from '@ngx-translate/core';
import { ChartConfiguration, ChartData } from 'chart.js';
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
  selector: 'app-graph-models-tested',
  templateUrl: './graph-models-tested.component.html',
  styleUrls: ['./graph-models-tested.component.scss'],
})
export class GraphModelsTestedComponent implements OnChanges, AfterViewInit {
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
      dataColors.push(model.color);
    }

    this.labels = dataLabels.map((label) => this._translate.instant(label));
    this.chartValues = {
      backgroundColor: dataColors,
      data: dataValues,
    };

    this.minValue = Math.min(...this.chartValues.data);
    this.maxValue = Math.max(...this.chartValues.data);
  }

  private getGraphYAxisLimits() {
    const margin = 0.1; // Margem de 10% para o valor máximo
    return {
      min: Math.floor(this.minValue - margin * this.minValue),
      max: Math.ceil(this.maxValue * 1.2), // Aumenta o limite superior em 20%
    };
  }

  private drawChart() {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets = this.createDatasets();
      if (this.chart.options?.scales) {
        this.chart.options.scales['y'] = this.getGraphYAxisLimits();
      }

      this.chart.update();
    }
  }

  private createDatasets(): ChartData['datasets'] {
    return [
      {
        type: 'line',
        label: 'Linha',
        data: this.chartValues.data.map((value) => value * 1.3),
        borderColor: '#6E85A2',
        borderWidth: 2,
        tension: 0.4,
        order: 0,
        pointRadius: 0,
        datalabels: {
          display: false,
        },
      },
      {
        type: 'bar',
        data: this.chartValues.data,
        backgroundColor: this.chartValues.backgroundColor,
        datalabels: {
          display: (context) => context.dataset.type === 'bar', // Exibe rótulos apenas para as barras
          anchor: 'end',
          align: 'start',
          offset: -20,
          formatter: (value) => `${value} und`, // Exibe o valor com sufixo
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#000', // Cor dos rótulos
        },
      },
    ];
  }

  private onBarClick(event: ChartEvent, elements: ActiveElement[]) {
    if (elements.length <= 0) {
      console.warn('No element found in chart');
      return;
    }

    const element = elements[0];
    const index = element.index;
    const label = this.labels[index];

    this._router.navigate([appRoutes.DASHBOARD, statsRoutes.DETAILED_VIEW], {
      queryParams: { label },
    });
  }

  private createChart() {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.labels ?? [],
        datasets: this.createDatasets(),
      },
      options: {
        layout: {
          padding: {
            top: 20,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            min: 0,
            max: Math.ceil(this.maxValue * 1.1),
          },
        },
        // onClick: (event, elements) => this.onBarClick(event, elements),
      },
    };

    const context = this.chartRef.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    this.chart = new Chart(context, config);
  }
}
