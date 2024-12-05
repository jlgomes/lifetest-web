import {Injectable} from "@angular/core";
import {HttpClientService} from "@core/infra/http/http-client-service";
import {catchError, map, Observable} from "rxjs";
import {UserModel} from "@core/domain/models/user-model";
import {UserForm} from "@core/domain/forms/user-form";
import {UserPasswordForm} from "@core/domain/forms/user-password-form";
import {PageRequestForm} from "@core/domain/forms/page-request-form";
import {PageModel} from "@core/domain/models/page-model";
import {pageParamUtil} from "@core/infra/utils/page-param-util";
import {PAGEABLE, USERS} from "@helpers/constants/path-rest-constants";
import {ForgotPasswordForm} from "@core/domain/forms/forgot-password-form";
import {HandleErrorsService} from "@core/domain/services/handle-errors.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }

  findAll(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(`${USERS}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findById(id: string): Observable<UserModel> {
    return this._http.get<UserModel>(`${USERS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete(`${USERS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void (0))
    );
  }

  save(data: UserForm): Observable<UserModel> {
    return this._http.post<UserModel>(`${USERS}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  update(id: string, data: UserForm): Observable<UserModel> {
    return this._http.put<UserModel>(`${USERS}/${id}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  activateRegistrationUser(id: string, data: UserPasswordForm): Observable<void> {
    return this._http.put(`${USERS}/${id}/activate-registration`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void (0))
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<UserModel>> {
    const queryParams = pageParamUtil(params)
    return this._http.get<PageModel<UserModel>>(`${USERS}/${PAGEABLE}`, queryParams).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  forgotPassword(data: ForgotPasswordForm): Observable<void> {
    return this._http.put<void>(`${USERS}/forgot-password`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void (0))
    );
  }

  passwordReset(id: string, data: UserPasswordForm): Observable<void> {
    return this._http.put(`${USERS}/${id}/password-recovery`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void (0))
    );
  }

}
