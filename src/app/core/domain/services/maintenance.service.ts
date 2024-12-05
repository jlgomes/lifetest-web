import { PageRequestForm } from './../forms/page-request-form';
import { catchError, Observable, map } from 'rxjs';
import {
  MaintenanceModel,
  MaintenanceStatus,
  MaintenanceTypes,
} from './../models/maintenance-model';
import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/infra/http/http-client-service';
import { HandleErrorsService } from './handle-errors.service';
import { PAGEABLE, MAINTENANCES } from '@helpers/constants/path-rest-constants';
import { MaintenanceForm } from '../forms/maintenance-form';
import { PageModel } from '../models/page-model';
import { pageParamUtil } from '@core/infra/utils/page-param-util';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorService: HandleErrorsService
  ) {}

  findById(id: string): Observable<MaintenanceModel> {
    return this._http.get<MaintenanceModel>(`${MAINTENANCES}/${id}`).pipe(
      catchError((err) => {
        this._handleErrorService.execute(err.error);
        throw err.error;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete(`${MAINTENANCES}/${id}`).pipe(
      catchError((err) => {
        this._handleErrorService.execute(err.error);
        throw err.error;
      }),
      map(() => void 0)
    );
  }

  save(data: MaintenanceForm): Observable<MaintenanceModel> {
    return this._http.post<MaintenanceModel>(`${MAINTENANCES}`, data).pipe(
      catchError((err) => {
        console.log(err);
        this._handleErrorService.execute(err.error);
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<MaintenanceModel>> {
    const queryParams = pageParamUtil(params);
    const maintenances = this._http
      .get<PageModel<MaintenanceModel>>(
        `${MAINTENANCES}/${PAGEABLE}`,
        queryParams
      )
      .pipe(
        map((data) => {
          data.content.forEach((maintenance) => {
            const type: string = maintenance.maintenanceType ?? '';
            maintenance.maintenanceType =
              MaintenanceTypes[type as keyof typeof MaintenanceTypes] ?? '';

            const today = dayjs();
            // Deadlines don't have time info, we need to add 1 day because of the Expired status
            const deadline = dayjs(maintenance.deadlineDate).add(1, 'day');
            if (maintenance.completionDate)
              maintenance.status = MaintenanceStatus.CLOSED;
            else if (today.isAfter(deadline))
              maintenance.status = MaintenanceStatus.EXPIRED;
            else if (today.isBefore(deadline))
              maintenance.status = MaintenanceStatus.OPEN;
          });
          return data;
        }),
        catchError((err) => {
          this._handleErrorService.execute(err.error);
          throw err.error;
        })
      );

    return maintenances;
  }

  markAsDone(element: MaintenanceModel): Observable<MaintenanceModel> {
    return this._http
      .put<MaintenanceModel>(`${MAINTENANCES}/${element.id}/finish`, {
        observation: element.observation,
      })
      .pipe(
        catchError((err) => {
          this._handleErrorService.execute(err.error);
          throw err.error;
        })
      );
  }
}
