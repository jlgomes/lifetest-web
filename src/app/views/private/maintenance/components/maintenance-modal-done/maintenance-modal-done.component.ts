import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogModel } from '@core/domain/models/dialog-model';
import { MaintenanceModel } from '@core/domain/models/maintenance-model';
import { MaintenanceService } from '@core/domain/services/maintenance.service';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-maintenance-modal-done',
  templateUrl: './maintenance-modal-done.component.html',
  styleUrls: ['./maintenance-modal-done.component.scss'],
})
export class MaintenanceModalDoneComponent implements OnInit {
  element?: MaintenanceModel;
  name?: string;
  title!: string;
  subtitle!: string;
  btnCancel?: boolean;
  btnClose?: boolean;
  btnConfirmLabel!: string;
  btnCancelLabel!: string;

  recoveryForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: ConfirmationDialogModel<any>,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private _translate: TranslateService,
    private fb: FormBuilder,
    private _formErrorUtil: FormErrorUtil,
    private _maintenanceService: MaintenanceService
  ) {
    this.element = this.data?.element;
    this.name = this.data?.name;
    this.title = this.data?.title ?? '';
    this.subtitle = this.data?.subtitle ?? '';
    this.btnCancel = this.data.btnCancel ?? true;
    this.btnClose = this.data?.btnClose ?? true;
    this.btnConfirmLabel = this.data?.btnConfirmLabel ?? 'dialogs.btn-register';
    this.btnCancelLabel = this.data?.btnCancelLabel ?? 'common.cancel';

    this.title = _translate.instant(this.title);
    if (this.name) this.title = `${this.title}: ${this.name}`;

    this.initForm();
  }

  ngOnInit(): void {
    this.view();
  }

  protected onSubmit(): void {
    if (this.element) {
      this.element.observation = this.recoveryForm.value.observation;
      this._maintenanceService.markAsDone(this.element).subscribe((data) => {});
    }
    this.dialogRef.close();
  }

  private view(): void {
    if (!this.element?.id) return;
  }

  protected closeDialog(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.recoveryForm = this.fb.group({
      observation: [this.element?.observation],
    });
  }
}
