import {HttpClientService} from "@core/infra/http/http-client-service";
import {catchError, map, Observable} from "rxjs";
import {LOGIN} from "@helpers/constants/path-rest-constants";
import {Injectable} from "@angular/core";
import {LoginForm} from "@core/domain/forms/login-form";
import {TokenModel} from "@core/domain/models/token-model";
import {AuthLocalStorageService} from "@core/domain/services/auth-local-storage.service";
import {HandleErrorsService} from "@core/domain/services/handle-errors.service";
import isTokenValid from "@core/infra/utils/valid-token";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _authLocalStoregeService: AuthLocalStorageService,
    private readonly _handleErrorsService:  HandleErrorsService,
  ) {
  }

  login(payload: LoginForm): Observable<TokenModel> {
    return this._http.post<TokenModel>(LOGIN, payload).pipe(
      map((token: TokenModel) => {
        this._authLocalStoregeService.addAuthLocalStorage(token);
        return token;
      }),
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }
  isLoggedIn(): boolean {
   const token = localStorage.getItem('token');
    return !!token && isTokenValid(token);
  }
}
