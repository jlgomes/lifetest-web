import { ErrorModel } from "@core/domain/models/error-model";
import { FormGroup } from "@angular/forms";
import { TypeToastEnum } from "@core/domain/enums/type-toast-enum";
import { ToastService } from "@core/domain/services/toast.service";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class FormErrorUtil {

  constructor(
    private _toastService: ToastService,
    private _translate: TranslateService,
  ) {
  }

  public errorHandle(err: ErrorModel, form: FormGroup) {
    err.errors?.forEach(
      (error) => {
        form.get(error.name)?.setErrors({ customError: error.message });
      }
    );
    form.markAllAsTouched();
  }

  public isInvalidForm(form: FormGroup): boolean {
    if (form.valid) return false;
    const toastMessage = this._translate.instant("validations.error-fields");
    this._toastService.show(toastMessage, TypeToastEnum.WARNING);
    form.markAllAsTouched();
    return true;
  }

  public isSampleInvalidForm(form: FormGroup): boolean {
    if (form.valid) return false;
    return true;
  }
}
