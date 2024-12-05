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

  getMostTestedModels(): Observable<BarChartData[]> {
    return this._http.get<BarChartData[]>(MOST_TESTED_MODELS).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  getLedPingErros(): Observable<BarChartData[]> {
    return this._http.get<BarChartData[]>(LED_PING_ERRORS).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  // Test Reports
  getTotalProductsTested(
    startDate: string,
    endDate: string
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(TOTAL_PRODUCTS_TESTED, { startDate, endDate })
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  getTotalFailuresPerProduct(
    startDate: string,
    endDate: string
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(TOTAL_FAILURES_PER_PRODUCT, { startDate, endDate })
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  getTotalFailuresPerType(
    startDate: string,
    endDate: string
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(TOTAL_FAILURES_PER_TYPE, { startDate, endDate })
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  getTotalFailuresDetailed(
    startDate: string,
    endDate: string
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(TOTAL_FAILURES_DETAILED, { startDate, endDate })
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  getHoursExecutedPerProduct(
    startDate: string,
    endDate: string
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(HOURS_EXECUTED_PER_PRODUCT, { startDate, endDate })
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  // Maintenance Reports
  getMaintenancesPerType(
    startDate: string,
    endDate: string
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(MAINTENANCES_PER_TYPE, { startDate, endDate })
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  getMaintenancesPerSlot(
    startDate: string,
    endDate: string
  ): Observable<BarChartData[]> {
    return this._http
      .get<BarChartData[]>(MAINTENANCES_PER_SLOT, { startDate, endDate })
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }
}
