import { Injectable } from "@angular/core";
import { HttpClientService } from "@core/infra/http/http-client-service";
import { catchError, Observable } from "rxjs";
import { VOLTAGES } from "@helpers/constants/path-rest-constants";
import { HandleErrorsService } from "@core/domain/services/handle-errors.service";
import { VoltageModel } from "../models/voltage-model";

@Injectable({
  providedIn: 'root',
})
export class VoltageService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }

  findAll(): Observable<VoltageModel[]> {
    return this._http.get<VoltageModel[]>(`${VOLTAGES}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findById(id: string): Observable<VoltageModel> {
    return this._http.get<VoltageModel>(`${VOLTAGES}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }
}
