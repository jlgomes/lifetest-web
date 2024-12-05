import { Injectable } from "@angular/core";
import { HttpClientService } from "@core/infra/http/http-client-service";
import { HandleErrorsService } from "@core/domain/services/handle-errors.service";
import { catchError, Observable, of } from "rxjs";
import { MARK_AS_READ, NOTIFICATION, PAGEABLE } from "@helpers/constants/path-rest-constants";
import { NotificationSlotModel } from "@core/domain/models/notification-slot-model";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { PageModel } from "@core/domain/models/page-model";
import { pageParamUtil } from "@core/infra/utils/page-param-util";
import { NotificationTestModel } from "@core/domain/models/notification-test-model";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }

  findById(id: string): Observable<NotificationSlotModel> {
    return this._http.get<NotificationSlotModel>(`${NOTIFICATION}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<NotificationTestModel>> {
    const queryParams = pageParamUtil(params)
    return this._http.get<PageModel<NotificationTestModel>>(`${NOTIFICATION}/${PAGEABLE}`, queryParams).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }

  markAsRead(id: string) {
    return this._http.patch(`${NOTIFICATION}/${id}/${MARK_AS_READ}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error);
        throw err.error;
      })
    );
  }
}
