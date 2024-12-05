import {Injectable} from "@angular/core";
import {HttpClientService} from "@core/infra/http/http-client-service";
import {catchError, Observable} from "rxjs";
import {MENU} from "@helpers/constants/path-rest-constants";
import {HandleErrorsService} from "@core/domain/services/handle-errors.service";
import {MenuCustomModel} from "@core/domain/models/menu-custom-model";

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }

  findAll(): Observable<MenuCustomModel[]> {
    return this._http.get<MenuCustomModel[]>(`${MENU}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

}
