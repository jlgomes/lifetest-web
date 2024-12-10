import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { appRoutes } from '@helpers/constants/path-rest-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { ProductService } from '@core/domain/services/product.service';
import { ProductModel } from '@core/domain/models/product-model';
import { MatSelectChange } from '@angular/material/select';
import { BarChartData } from '@core/domain/models/reports/bar-chart-data';
import { StatsService } from '@core/domain/services/stats.service';
import { ReportDetails, generateReportPDF } from '../generate-report';
import { TodoItemNode } from '@shared/components/checkbox-tree/checkbox-tree.component';
import { DateInterval } from '@shared/components/date-picker/date-picker.component';
import { FiltersReportParams } from '@core/domain/models/reports/filters-report';
import { formatDate } from '@core/infra/utils/page-param-util';
import { FilterService } from '@core/domain/services/filter.service';

enum ReportTypes {
  TESTS = 'reports.types.tests',
  MAINTENANCE = 'reports.types.maintenance',
}

interface ReportData {
  totalProductsTested: BarChartData[];
  totalFailuresPerProduct: BarChartData[];
  totalFailuresPerType: BarChartData[];
  totalFailuresDetailed: BarChartData[];
  hoursExecutedPerProduct: BarChartData[];
  averageRackTemperature: BarChartData[];
  powerCycleQuantity: BarChartData[];
  maintenancesPerType: BarChartData[];
  maintenancesPerSlot: BarChartData[];
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ReportsComponent implements OnChanges {
  protected appRoutes = appRoutes;
  protected recoveryForm!: FormGroup;
  protected products: ProductModel[] = [];
  protected typeSelection: string = 'TESTS';

  protected testReportTypes = Object.keys(ReportTypes).map((key) => {
    return {
      key,
      text: this._translate.instant(
        ReportTypes[key as keyof typeof ReportTypes]
      ),
    };
  });

  protected mostTestedModelsData: BarChartData[] = [];
  protected ledPingErrorsData: BarChartData[] = [];
  protected filters: Partial<FiltersReportParams> = {};
  protected showReport = false;

  protected startDate?: string = '';
  protected endDate?: string = '';
  protected startTime = '';
  protected endTime = '';

  protected reportData: Partial<ReportData> = {};

  protected treeProducts: any = {};
  protected selectionTests: any = {};

  protected treeTests = {
    'reports.all': {
      'reports.tests.total-products-tested': null,
      'reports.tests.total-failures-per-product': null,
      'reports.tests.total-failures-per-type': {
        LED: null,
        Ping: null,
      },
      'reports.tests.total-failures-detailed': {
        'LED Power': null,
        'LED 2G': null,
        'LED 5G': null,
        'Ping P1': null,
        'Ping P2': null,
        'Ping P3': null,
        'Ping P4': null,
      },
      'reports.tests.hours-executed-per-product': null,
    },
  };

  protected treeMaintenance = {
    'reports.all': {
      'reports.maintenance.average-rack-temperature': null,
      'reports.maintenance.power-cycle-quantity': null,
      'reports.maintenance.maintenances-per-type': null,
      'reports.maintenance.maintenances-per-slot': null,
    },
  };

  constructor(
    private _translate: TranslateService,
    private titleService: Title,
    private fb: FormBuilder,
    private _formErrorUtil: FormErrorUtil,
    private _productService: ProductService,
    private _statsService: StatsService,
    private filterService: FilterService
  ) {
    const pageTitle = _translate.instant('page-title.reports');
    this.titleService.setTitle(pageTitle);
    this.initForm();

    const { start, end } = this.filterService.getIntervalInitial();
    this.endDate = end?.toUTCString();
    this.startDate = start?.toUTCString();

    const products: { [key: string]: null } = {};
    _productService.findAll().subscribe((data) => {
      this.products = data;
      for (const product of data) {
        products[`${product.model}`] = null;
      }

      this.treeProducts = {
        'reports.all-products': products,
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  initForm(): void {
    this.recoveryForm = this.fb.group({
      type: ['TESTS', [Validators.required]],
      product: [''],
      initialDate: [''],
      endDate: [''],
    });
  }

  onReportTypeChange(event: MatSelectChange) {
    this.typeSelection = event.value;
  }

  generateReport() {
    this.showReport = true;
    this.fetchAll();
  }

  private fetchAll() {
    const params = this.getParams();

    // Test reports
    this._statsService
      .getMostTestedModels(params)
      .subscribe((value: BarChartData[]) => {
        this.mostTestedModelsData = value;
      });

    this._statsService
      .getLedPingErros(params)
      .subscribe((value: BarChartData[]) => {
        this.ledPingErrorsData = value;
      });

    this._statsService
      .getTotalProductsTested(params)
      .subscribe((value: BarChartData[]) => {
        this.reportData.totalProductsTested = value;
      });

    this._statsService
      .getTotalFailuresPerProduct(params)
      .subscribe((value: BarChartData[]) => {
        this.reportData.totalFailuresPerProduct = value;
      });

    this._statsService
      .getTotalFailuresPerType(params)
      .subscribe((value: BarChartData[]) => {
        this.reportData.totalFailuresPerType = value;
      });

    this._statsService
      .getTotalFailuresDetailed(params)
      .subscribe((value: BarChartData[]) => {
        this.reportData.totalFailuresDetailed = value;
      });

    this._statsService
      .getHoursExecutedPerProduct(params)
      .subscribe((value: BarChartData[]) => {
        this.reportData.hoursExecutedPerProduct = value;
      });

    // Maintenance reports
    this._statsService
      .getMaintenancesPerType(params)
      .subscribe((value: BarChartData[]) => {
        this.reportData.maintenancesPerType = value;
      });

    this._statsService
      .getMaintenancesPerSlot(params)
      .subscribe((value: BarChartData[]) => {
        this.reportData.maintenancesPerSlot = value;
      });
  }

  getParams(): Partial<FiltersReportParams> {
    const params: Partial<FiltersReportParams> = {};

    if (this.startDate) {
      params['startDate'] = formatDate({
        date: this.startDate,
        isStart: true,
        time: this.startTime,
      });
    }

    if (this.endDate) {
      params['endDate'] = formatDate({
        date: this.endDate,
        isStart: false,
        time: this.endTime,
      });
    }

    return params;
  }

  async generateReportPDF() {
    const canvas1: HTMLCanvasElement | null = document.getElementById(
      'total-products-tested'
    ) as HTMLCanvasElement | null;
    const canvas2: HTMLCanvasElement | null = document.getElementById(
      'total-failures-per-product'
    ) as HTMLCanvasElement | null;
    const canvas3: HTMLCanvasElement | null = document.getElementById(
      'total-failures-per-type'
    ) as HTMLCanvasElement | null;
    const canvas4: HTMLCanvasElement | null = document.getElementById(
      'total-failures-detailed'
    ) as HTMLCanvasElement | null;
    const canvas5: HTMLCanvasElement | null = document.getElementById(
      'hours-executed-per-product'
    ) as HTMLCanvasElement | null;
    const canvas6: HTMLCanvasElement | null = document.getElementById(
      'maintenances-per-type'
    ) as HTMLCanvasElement | null;
    const canvas7: HTMLCanvasElement | null = document.getElementById(
      'maintenances-per-slot'
    ) as HTMLCanvasElement | null;

    const reports: ReportDetails[] = [];

    if (this.reportData.totalProductsTested)
      reports.push({
        title: 'reports.tests.total-products-tested',
        data: this.reportData.totalProductsTested,
        image: canvas1,
        description: 'reports.tests.total-products-tested',
      });

    if (this.reportData.totalFailuresPerProduct)
      reports.push({
        title: 'reports.tests.total-failures-per-product',
        data: this.reportData.totalFailuresPerProduct,
        image: canvas2,
        description: 'reports.tests.total-failures-per-product',
      });

    if (this.reportData.totalFailuresPerType)
      reports.push({
        title: 'reports.tests.total-failures-per-type',
        data: this.reportData.totalFailuresPerType,
        image: canvas3,
        description: 'reports.tests.total-failures-per-type',
      });

    if (this.reportData.totalFailuresDetailed)
      reports.push({
        title: 'reports.tests.total-failures-detailed',
        data: this.reportData.totalFailuresDetailed,
        image: canvas4,
        description: 'reports.tests.total-failures-detailed',
      });

    if (this.reportData.hoursExecutedPerProduct)
      reports.push({
        title: 'reports.tests.hours-executed-per-product',
        data: this.reportData.hoursExecutedPerProduct,
        image: canvas5,
        description: 'reports.tests.hours-executed-per-product',
      });

    if (this.reportData.maintenancesPerType)
      reports.push({
        title: 'reports.maintenance.maintenances-per-type',
        data: this.reportData.maintenancesPerType,
        image: canvas6,
        description: 'reports.maintenance.maintenances-per-type',
      });

    if (this.reportData.maintenancesPerSlot)
      reports.push({
        title: 'reports.maintenance.maintenances-per-slot',
        data: this.reportData.maintenancesPerSlot,
        image: canvas7,
        description: 'reports.maintenance.maintenances-per-slot',
      });

    setTimeout(() => {
      generateReportPDF(this._translate, reports);
    }, 1000);
  }

  changeTestsSelection(selection: any) {
    selection = selection as TodoItemNode;
    console.log(selection);
  }

  onDateChange(value: DateInterval) {
    this.startDate = value.start?.toString() ?? '';
    this.endDate = value.end?.toString() ?? '';
  }

  setStartTime(value: string) {
    this.startTime = value;
  }

  setEndTime(value: string) {
    this.endTime = value;
  }
}
