import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileModel } from "@core/domain/models/profile-model";
import { UserService } from "@core/domain/services/user.service";
import { ProfileService } from "@core/domain/services/profile.service";
import { UserForm } from "@core/domain/forms/user-form";
import { DialogModel } from '@core/domain/models/dialog-model';
import { FormErrorUtil } from "@core/infra/utils/form-error-util";
import { ErrorModel } from "@core/domain/models/error-model";
import { AuthLocalStorageService } from "@core/domain/services/auth-local-storage.service";
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { UserModel } from '@core/domain/models/user-model';


@Component({
  selector: 'app-clients-dialog-form',
  templateUrl: './users-dialog-form.component.html',
  styleUrls: ['./users-dialog-form.component.scss']
})
export class UsersDialogFormComponent implements OnInit {
  private user!: UserModel;
  protected recoveryForm!: FormGroup;
  protected title!: string;
  protected disabled: boolean = false;
  protected isLoading: boolean = false;
  protected selectOptionsProfile: ProfileModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: DialogModel<UserModel>,
    private dialogRef: MatDialogRef<UsersDialogFormComponent>,
    private fb: FormBuilder,
    private _userService: UserService,
    private _profileService: ProfileService,
    private _formErrorUtil: FormErrorUtil,
    private authLocalStorageService: AuthLocalStorageService,
    private _translate: TranslateService,
    private _toast: ToastService,
  ) {
    this.user = data.element;
    this.recoveryForm = this.initForm();
    this.title = this.data?.title ?? "";
    this.disabled = this.data?.disabled ?? false;
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  initForm(): FormGroup {
    if (this.user)
      return (this.recoveryForm = this.fb.group({
        name: [this.user.name, [Validators.required]],
        email: [this.user.email, [Validators.required]],
        profileId: [this.user.profile.id, [Validators.required]],
      }));
    else return (this.recoveryForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      profileId: ['', [Validators.required]],
    }));
  }

  onSubmit(): void {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;
    if (this.isLoading) return;
    const formValue: UserForm = this.recoveryForm.value;

    this.isLoading = true;
    if (this.user) {
      this._userService.update(this.user.id, formValue).subscribe({
        next: (value) => {
          this.dialogRef.close();
          this.recoveryForm.reset();
          this.authLocalStorageService.updateUser(value);
          const toastMessage = this._translate.instant("toasts.edit-user");
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
          this.isLoading = false;
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        }
      });
    } else {
      this._userService.save(formValue).subscribe({
        next: () => {
          this.dialogRef.close();
          this.recoveryForm.reset();
          const toastMessage = this._translate.instant("toasts.register-user");
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
          this.isLoading = false;
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        }
      });
    }
  }

  private loadProfile(): void {
    this._profileService.findAll().subscribe(value => {
      this.selectOptionsProfile = value;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
