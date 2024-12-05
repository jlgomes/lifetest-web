import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {UserService} from "@core/domain/services/user.service";
import {Subscription} from "rxjs";
import {FormErrorUtil} from "@core/infra/utils/form-error-util";
import {ErrorModel} from "@core/domain/models/error-model";
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  routeSub!: Subscription;
  recoveryForm!: FormGroup;
  id!: string;
  code!: string;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _translate: TranslateService,
    private titleService: Title,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _formErrorUtil: FormErrorUtil
  ) {
    const pageTitle = _translate.instant("change-password.title")
    this.titleService.setTitle(pageTitle);
    this.recoveryForm = this.initForm();
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
    }));
  }

  onSubmit() {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;

    this._userService.passwordReset(this.id, {
      password: this.recoveryForm.value.password,
      passwordConfirmation: this.recoveryForm.value.passwordConfirmation,
      code: this.code
    }).subscribe({
      next: () => {
        this._router.navigate([appRoutes.LOGIN]);
        this.recoveryForm.reset();
      },
      error: (err: ErrorModel) => this._formErrorUtil.errorHandle(err, this.recoveryForm),
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this._route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.routeSub = this._route.queryParams.subscribe(param => {
      this.code = param['code']
    });
  }

  navigateToLogin() {
    this._router.navigate([appRoutes.LOGIN]);
  }
}
