import { catchError, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PAGEABLE, REPAIRS } from '@helpers/constants/path-rest-constants';
import { HttpClientService } from '@core/infra/http/http-client-service';
import { TranslateService } from '@ngx-translate/core';
import { pageParamUtil } from '@core/infra/utils/page-param-util';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { HandleErrorsService } from './handle-errors.service';
import { RepairModel } from '../models/repair-model';
import { RepairForm } from '../forms/repair-form';
import { PageRequestForm } from '../forms/page-request-form';
import { PageModel } from '../models/page-model';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  private data?: string;

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
    private readonly _toastService: ToastService,
    private readonly _translate: TranslateService
  ) {}

  save(data: RepairForm): Observable<RepairModel> {
    return this._http.post<RepairModel>(`${REPAIRS}`, data).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      }),
      map((res) => {
        const toastsMessage = this._translate.instant(
          'toasts.created-repair-success'
        );
        this._toastService.show(toastsMessage, TypeToastEnum.INFO);
        return res;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete(`${REPAIRS}/${id}`).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      }),
      map(() => void 0)
    );
  }

  findById(id: string): Observable<RepairModel> {
    return this._http.get<RepairModel>(`${REPAIRS}/${id}`).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  changeFalseReject(id: string) {
    return this._http
      .put<void>(`${REPAIRS}/change/false-reject/${id}`, null)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  update(id: string, data: RepairForm): Observable<RepairModel> {
    return this._http.put<RepairModel>(`${REPAIRS}/${id}`, data).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  findAll(): Observable<RepairModel[]> {
    return this._http.get<RepairModel[]>(`${REPAIRS}`).pipe(
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<RepairModel>> {
    const queryParams = pageParamUtil(params);
    return this._http
      .get<PageModel<RepairModel>>(`${REPAIRS}/${PAGEABLE}`, queryParams)
      .pipe(
        catchError((err) => {
          this._handleErrorsService.execute(err.error);
          throw err.error;
        })
      );
  }

  setData(data: string) {
    this.data = data;
  }

  getData(): string | undefined {
    return this.data;
  }

  setObject(data: any) {
    this.data = data;
  }

  getObject(): any {
    return this.data;
  }

  clearData() {
    this.data = undefined;
  }
}
