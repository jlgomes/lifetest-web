import {Injectable} from "@angular/core";
import {HttpClientService} from "@core/infra/http/http-client-service";
import {catchError, Observable} from "rxjs";
import {LOG_EVENT, PAGEABLE} from "@helpers/constants/path-rest-constants";
import {PageRequestForm} from "@core/domain/forms/page-request-form";
import {PageModel} from "@core/domain/models/page-model";
import {pageParamUtil} from "@core/infra/utils/page-param-util";
import {HandleErrorsService} from "@core/domain/services/handle-errors.service";
import {LogEventModel} from "@core/domain/models/log-event-model";

@Injectable({
  providedIn: 'root',
})
export class LogEventService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }


  findById(id: string): Observable<LogEventModel> {
    return this._http.get<LogEventModel>(`${LOG_EVENT}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<LogEventModel>> {
    const queryParams = pageParamUtil(params)
    return this._http.get<PageModel<LogEventModel>>(`${LOG_EVENT}/${PAGEABLE}`, queryParams).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

}
