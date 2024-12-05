import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/infra/http/http-client-service';
import { catchError, Observable } from 'rxjs';
import { TelemetryModel } from '@core/domain/models/telemetry-model';
import { LED_TELEMETRIES, PAGEABLE, PING_TELEMETRIES, TELEMETRIES } from '@helpers/constants/path-rest-constants';
import { TelemetryForm } from '@core/domain/forms/telemetry-form';
import { PageRequestForm } from '@core/domain/forms/page-request-form';
import { PageModel } from '@core/domain/models/page-model';
import { pageParamUtil } from '@core/infra/utils/page-param-util';
import { HandleErrorsService } from '@core/domain/services/handle-errors.service';
import { LedTelemetryModel } from '../models/led-telemetry-model';
import { PingTelemetryModel } from '../models/ping-telemetry-model';

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService
  ) {}

  findById(id: string): Observable<TelemetryModel> {
    return this._http.get<TelemetryModel>(`${TELEMETRIES}/${id}`).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  update(id: string, data: TelemetryForm): Observable<TelemetryModel> {
    return this._http.put<TelemetryModel>(`${TELEMETRIES}/${id}`, data).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<TelemetryModel>> {
    const queryParams = pageParamUtil(params);
    return this._http
      .get<PageModel<TelemetryModel>>(`${TELEMETRIES}/${PAGEABLE}`, queryParams)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  ledPageable(params: PageRequestForm): Observable<PageModel<LedTelemetryModel>> {
    const queryParams = pageParamUtil(params);
    return this._http
      .get<PageModel<LedTelemetryModel>>(`${LED_TELEMETRIES}/${PAGEABLE}`, queryParams)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  pingPageable(params: PageRequestForm): Observable<PageModel<PingTelemetryModel>> {
    const queryParams = pageParamUtil(params);
    return this._http
      .get<PageModel<PingTelemetryModel>>(`${PING_TELEMETRIES}/${PAGEABLE}`, queryParams)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }
}
