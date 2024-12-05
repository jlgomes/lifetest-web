import { Injectable } from "@angular/core";
import { HttpClientService } from "@core/infra/http/http-client-service";
import { catchError, map, Observable } from "rxjs";
import { TestModel } from "@core/domain/models/test-model";
import { PAGEABLE, TESTS } from "@helpers/constants/path-rest-constants";
import { TestForm } from "@core/domain/forms/test-form";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { PageModel } from "@core/domain/models/page-model";
import { pageParamUtil } from "@core/infra/utils/page-param-util";
import { HandleErrorsService } from "@core/domain/services/handle-errors.service";
import { SlotModel } from "@core/domain/models/slot-model";
import { ToastService } from "@core/domain/services/toast.service";
import { TypeToastEnum } from "@core/domain/enums/type-toast-enum";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class TestService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
    private readonly _toastService: ToastService,
    private _translate: TranslateService
  ) {
  }

  findAll(): Observable<TestModel[]> {
    return this._http.get<TestModel[]>(`${TESTS}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findById(id: string): Observable<TestModel> {
    return this._http.get<TestModel>(`${TESTS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findInfoById(id: string): Observable<SlotModel> {
    return this._http.get<SlotModel>(`${TESTS}/${id}/info`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete(`${TESTS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void (0))
    );
  }

  save(data: TestForm): Observable<TestModel> {
    return this._http.post<TestModel>(`${TESTS}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(res => {
        const toastsMessage = this._translate.instant("toasts.created-test-success");
        this._toastService.show(toastsMessage, TypeToastEnum.SUCCESS);
        return res;
      })
    );
  }

  update(id: string, data: TestForm): Observable<TestModel> {
    return this._http.put<TestModel>(`${TESTS}/${id}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  finish(id: string): Observable<void> {
    return this._http.patch(`${TESTS}/${id}/finish`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void (0))
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<TestModel>> {
    const queryParams = pageParamUtil(params)
    return this._http.get<PageModel<TestModel>>(`${TESTS}/${PAGEABLE}`, queryParams).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  initialize(): Observable<void> {
    return this._http.patch(`${TESTS}/start`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => {
        void (0)})
    );
  }



  initializeById(id: string): Observable<void> {
    return this._http.patch(`${TESTS}/${id}/start`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => {
        void (0)})
    );
  }

}
