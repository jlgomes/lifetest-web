import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/infra/http/http-client-service';
import { HandleErrorsService } from '@core/domain/services/handle-errors.service';
import { catchError, map, Observable } from 'rxjs';
import { MEDIA } from '@helpers/constants/path-rest-constants';
import { MediaDataModel } from '../models/media-model';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService
  ) {}

  getMedia(id: string): Observable<MediaDataModel> {
    return this._http.getMedia(`${MEDIA}/${id}`).pipe(
      map((data) => {
        return JSON.parse(data.body);
      }),
      catchError((err) => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }
}
