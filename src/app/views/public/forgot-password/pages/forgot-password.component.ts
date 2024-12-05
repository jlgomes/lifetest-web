import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {UserService} from "@core/domain/services/user.service";
import {FormErrorUtil} from "@core/infra/utils/form-error-util";
import {ErrorModel} from "@core/domain/models/error-model";
import { appRoutes } from '@helpers/constants/path-rest-constants';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  recoveryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _translate: TranslateService,
    private titleService: Title,
    private _userService: UserService,
    private _formErrorUtil:FormErrorUtil,
    private _toast: ToastService,
  ) {
    const pageTitle = _translate.instant("forgot-password.title")
    this.titleService.setTitle(pageTitle);
    this.recoveryForm = this.initForm();
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      email: ['', [Validators.required]],
    }));
  }

  onSubmit() {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;

    this._userService.forgotPassword({
      email: this.recoveryForm.value.email
    }).subscribe({
      next: () => {
        this.navigateToLogin();
        this.recoveryForm.reset();
        this._toast.show(
          this._translate.instant("users.email-toast"),
          TypeToastEnum.SUCCESS
        );
      },
      error: (err:ErrorModel) => this._formErrorUtil.errorHandle(err,this.recoveryForm),
    });
  }

  navigateToLogin(){
    this._router.navigate([appRoutes.LOGIN]);
  }
}
