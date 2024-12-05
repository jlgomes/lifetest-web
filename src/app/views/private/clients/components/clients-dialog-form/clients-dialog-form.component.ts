import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from "@core/domain/services/client.service";
import { DialogModel } from '@core/domain/models/dialog-model';
import { FormErrorUtil } from "@core/infra/utils/form-error-util";
import { ErrorModel } from "@core/domain/models/error-model";
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { ClientForm } from '@core/domain/forms/client-form';
import { ClientModel } from '@core/domain/models/client-model';


@Component({
  selector: 'app-clients-dialog-form',
  templateUrl: './clients-dialog-form.component.html',
  styleUrls: ['./clients-dialog-form.component.scss']
})
export class ClientsDialogFormComponent implements OnInit {
  private client!: ClientModel;

  protected recoveryForm!: FormGroup;
  protected title!: string;
  protected disabled: boolean = false;
  protected isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: DialogModel<ClientModel>,
    private dialogRef: MatDialogRef<ClientsDialogFormComponent>,
    private fb: FormBuilder,
    private _clientService: ClientService,
    private _formErrorUtil: FormErrorUtil,
    private _translate: TranslateService,
    private _toast: ToastService,
  ) {
    this.client = data.element;
    this.recoveryForm = this.initForm();
    this.title = this.data?.title ?? "";
    this.disabled = this.data?.disabled ?? false;
  }

  ngOnInit(): void { }

  initForm(): FormGroup {
    if (this.client)
      return (this.recoveryForm = this.fb.group({
        name: [this.client.name, [Validators.required]],
        ipRange: [this.client.ipRange, [Validators.required]],
      }));
    else return (this.recoveryForm = this.fb.group({
      name: ['', [Validators.required]],
      ipRange: ['', [Validators.required, Validators.pattern("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")]],
    }));
  }

  onSubmit(): void {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;
    if (this.isLoading) return;
    const formValue: ClientForm = this.recoveryForm.value;

    this.isLoading = true;
    if (this.client) {
      this._clientService.update(this.client.id, formValue).subscribe({
        next: () => {
          this.dialogRef.close();
          this.recoveryForm.reset();
          const toastMessage = this._translate.instant("toasts.edit-client");
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
          this.isLoading = false;
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        }
      });
    } else {
      this._clientService.save(formValue).subscribe({
        next: () => {
          this.dialogRef.close();
          this.recoveryForm.reset();
          const toastMessage = this._translate.instant("toasts.register-client");
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

  closeDialog(): void {
    this.dialogRef.close();
  }

}
