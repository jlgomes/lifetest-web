import {Injectable} from "@angular/core";
import {HttpClientService} from "@core/infra/http/http-client-service";
import {catchError, map, Observable} from "rxjs";
import {PageRequestForm} from "@core/domain/forms/page-request-form";
import {ProfileModel} from "@core/domain/models/profile-model";
import {PageModel} from "@core/domain/models/page-model";
import {pageParamUtil} from "@core/infra/utils/page-param-util";
import {PAGEABLE, PROFILES} from "@helpers/constants/path-rest-constants";
import {ProfileForm} from "@core/domain/forms/profile-form";
import {HandleErrorsService} from "@core/domain/services/handle-errors.service";

@Injectable({
  providedIn: 'root',
})
export class ProfileService{

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService:  HandleErrorsService,
  ) {
  }

  findAll(): Observable<ProfileModel[]> {
    return this._http.get<ProfileModel[]>(`${PROFILES}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findById(id: string): Observable<ProfileModel> {
    return this._http.get<ProfileModel>(`${PROFILES}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete(`${PROFILES}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void(0))
    );
  }

  save(data: ProfileForm): Observable<ProfileModel> {
    return this._http.post<ProfileModel>(`${PROFILES}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  update(id: string, data: ProfileForm): Observable<ProfileModel> {
    return this._http.put<ProfileModel>(`${PROFILES}/${id}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<ProfileModel>> {
    const queryParams = pageParamUtil(params)
    return this._http.get<PageModel<ProfileModel>>(`${PROFILES}/${PAGEABLE}`, queryParams).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

}
