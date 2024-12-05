import { Injectable } from "@angular/core";
import { HttpClientService } from "@core/infra/http/http-client-service";
import { catchError, Observable } from "rxjs";
import { RACKS } from "@helpers/constants/path-rest-constants";
import { HandleErrorsService } from "@core/domain/services/handle-errors.service";
import { RackModel } from "../models/rack-model";
import { RackForm } from "../forms/rack-form";

@Injectable({
  providedIn: 'root',
})
export class RackService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }

  findAll(): Observable<RackModel[]> {
    return this._http.get<RackModel[]>(`${RACKS}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findById(id: string): Observable<RackModel> {
    return this._http.get<RackModel>(`${RACKS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  update(id: string, data: RackForm): Observable<RackModel> {
    return this._http.put<RackModel>(`${RACKS}/${id}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

}
