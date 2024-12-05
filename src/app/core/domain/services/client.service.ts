import {Injectable} from "@angular/core";
import {HttpClientService} from "@core/infra/http/http-client-service";
import {catchError, map, Observable} from "rxjs";
import {ClientModel} from "@core/domain/models/client-model";
import {CLIENTS, PAGEABLE} from "@helpers/constants/path-rest-constants";
import {PageRequestForm} from "@core/domain/forms/page-request-form";
import {PageModel} from "@core/domain/models/page-model";
import {pageParamUtil} from "@core/infra/utils/page-param-util";
import {ClientForm} from "@core/domain/forms/client-form";
import {HandleErrorsService} from "@core/domain/services/handle-errors.service";

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }

  findAll(): Observable<ClientModel[]> {
    return this._http.get<ClientModel[]>(`${CLIENTS}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findById(id: string): Observable<ClientModel> {
    return this._http.get<ClientModel>(`${CLIENTS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete(`${CLIENTS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void (0))
    );
  }

  save(data: ClientForm): Observable<ClientModel> {
    return this._http.post<ClientModel>(`${CLIENTS}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  update(id: string, data: ClientForm): Observable<ClientModel> {
    return this._http.put<ClientModel>(`${CLIENTS}/${id}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<ClientModel>> {
    const queryParams = pageParamUtil(params)
    return this._http.get<PageModel<ClientModel>>(`${CLIENTS}/${PAGEABLE}`, queryParams).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }
}
