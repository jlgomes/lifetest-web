import { Component } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from "@core/domain/services/auth.service";
import { TranslateService } from '@ngx-translate/core';
import { FormErrorUtil } from "@core/infra/utils/form-error-util";
import { ErrorModel } from "@core/domain/models/error-model";
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected loginForm!: FormGroup;
  protected isLoading = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _translate: TranslateService,
    private titleService: Title,
    private _formErrorUtil:FormErrorUtil,
  ) {
    const pageTitle = _translate.instant("login.title");
    this.titleService.setTitle(pageTitle);
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return (this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }));
  }


  onSubmit() {
    if (this._formErrorUtil.isInvalidForm(this.loginForm)) return;
    this.isLoading = true;
    this._authService.login(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }
    ).subscribe({
      next: () => {
        this._router.navigate([appRoutes.CONTROL_PANEL]);
        this.loginForm.reset();
      },
      error: (error: ErrorModel) => {
        this._formErrorUtil.errorHandle(error,this.loginForm);
        this.isLoading = false;
      },
    });
  }

  navigateToForgotPassword() {
    this._router.navigate([appRoutes.FORGOT_PASSWORD]);
  }
}
