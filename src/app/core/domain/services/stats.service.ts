import {
  TOTAL_FAILURES_PER_TYPE,
  TOTAL_FAILURES_DETAILED,
  HOURS_EXECUTED_PER_PRODUCT,
  MAINTENANCES_PER_SLOT,
  MAINTENANCES_PER_TYPE,
} from './../../../shared/helpers/constants/path-rest-constants';
import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/infra/http/http-client-service';
import { catchError, Observable } from 'rxjs';
import {
  LED_PING_ERRORS,
  MOST_TESTED_MODELS,
  STATS,
  TOTAL_FAILURES_PER_PRODUCT,
  TOTAL_PRODUCTS_TESTED,
} from '@helpers/constants/path-rest-constants';
import { HandleErrorsService } from '@core/domain/services/handle-errors.service';
import { StatsModel } from '@core/domain/models/stats-model';
import { BarChartData } from '../models/reports/bar-chart-data';
import { FiltersReportParams } from '../models/reports/filters-report';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService
  ) {}

  // Dashboard
  getStats(): Observable<StatsModel> {
    return this._http.get<StatsModel>(`${STATS}`).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  getMostTestedModels(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http.get<BarChartData[]>(MOST_TESTED_MODELS, filters).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  getLedPingErros(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http.get<BarChartData[]>(LED_PING_ERRORS, filters).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  // Test Reports
  getTotalProductsTested(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http.get<BarChartData[]>(TOTAL_PRODUCTS_TESTED, filters).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  getTotalFailuresPerProduct(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(TOTAL_FAILURES_PER_PRODUCT, filters)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  getTotalFailuresPerType(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(TOTAL_FAILURES_PER_TYPE, filters)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  getTotalFailuresDetailed(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(TOTAL_FAILURES_DETAILED, filters)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  getHoursExecutedPerProduct(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(HOURS_EXECUTED_PER_PRODUCT, filters)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  // Maintenance Reports
  getMaintenancesPerType(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http.get<BarChartData[]>(MAINTENANCES_PER_TYPE, filters).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  getMaintenancesPerSlot(
    filters: Partial<FiltersReportParams> = {}
  ): Observable<BarChartData[]> {
    return this._http.get<BarChartData[]>(MAINTENANCES_PER_SLOT, filters).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }
}
