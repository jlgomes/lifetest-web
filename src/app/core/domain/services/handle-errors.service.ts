import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { ErrorModel } from '@core/domain/models/error-model';
import { ToastService } from '@core/domain/services/toast.service';
import { appRoutes } from '@helpers/constants/path-rest-constants';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorsService {
  private hasModalOpened: boolean = false;

  constructor(
    private _toast: ToastService,
    private _translate: TranslateService,
    private dialog: MatDialog,
    private _router: Router
  ) {}

  execute(error: ErrorModel): void {
    const genericErrorMessage = this._translate.instant('toasts.server-error');
    if (!error) {
      this._toast.show(genericErrorMessage, TypeToastEnum.ERROR);
      return;
    }

    console.error(error);
    switch (error.status) {
      case 401:
        if (error.detail === 'Token expirado' && !this.hasModalOpened) {
          this.hasModalOpened = true;
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            title: 'errors.session-expired',
            subtitle: 'errors.login-again',
            btnClose: false,
            btnCancel: false,
            btnConfirmLabel: 'login.login-label',
            callback: () => {
              this._router.navigate([appRoutes.LOGIN]);
              this.hasModalOpened = false;
            },
          };
          dialogConfig.disableClose = true;

          this.dialog.open(ConfirmationDialogComponent, dialogConfig);
        }
        break;
    }

    this._toast.show(
      error.detail ?? error.message ?? genericErrorMessage,
      TypeToastEnum.ERROR
    );
    error.errors?.forEach((element) => {
      this._toast.show(`${element.message}`, TypeToastEnum.ERROR);
    });
  }
}
