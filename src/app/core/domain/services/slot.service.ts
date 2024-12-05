import { Injectable } from "@angular/core";
import { HttpClientService } from "@core/infra/http/http-client-service";
import { catchError, Observable } from "rxjs";
import { PAGEABLE, SLOTS } from "@helpers/constants/path-rest-constants";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { PageModel } from "@core/domain/models/page-model";
import { pageParamUtil } from "@core/infra/utils/page-param-util";
import { HandleErrorsService } from "@core/domain/services/handle-errors.service";
import { SlotModel } from "@core/domain/models/slot-model";

@Injectable({
  providedIn: 'root',
})
export class SlotService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }

  findAll(): Observable<SlotModel[]> {
    return this._http.get<SlotModel[]>(`${SLOTS}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findById(id: string): Observable<SlotModel> {
    return this._http.get<SlotModel>(`${SLOTS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findInfoById(id: string): Observable<SlotModel> {
    return this._http.get<SlotModel>(`${SLOTS}/${id}/info`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<SlotModel>> {
    const queryParams = pageParamUtil(params)
    return this._http.get<PageModel<SlotModel>>(`${SLOTS}/${PAGEABLE}`, queryParams).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

}
