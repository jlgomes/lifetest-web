import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { RackForm } from '@core/domain/forms/rack-form';
import { ErrorModel } from '@core/domain/models/error-model';
import { RackModel } from '@core/domain/models/rack-model';
import { VoltageModel } from '@core/domain/models/voltage-model';
import { RackService } from '@core/domain/services/rack.service';
import { ToastService } from '@core/domain/services/toast.service';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rack-config-modal',
  templateUrl: './rack-config-modal.component.html',
  styleUrls: ['./rack-config-modal.component.scss']
})
export class RackConfigModalComponent {
  protected recoveryForm!: FormGroup;
  protected isLoading: boolean = false;
  protected rack!: RackModel;
  protected voltageOptions: { id: string, voltage: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { rack: RackModel, voltages: VoltageModel[] },
    public dialogRef: MatDialogRef<RackConfigModalComponent>,
    private fb: FormBuilder,
    private _formErrorUtil: FormErrorUtil,
    private _rackService: RackService,
    private _translate: TranslateService,
    private _toast: ToastService,
  ) {
    for (let item of data.voltages) {
      this.voltageOptions.push({
        id: item.id,
        voltage: `${item.voltage}v`,
      });
    }
    this.rack = data.rack;
    this.recoveryForm = this.initForm();
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      name: this.rack.name,
      powerCyclePerDay: [this.rack.powerCyclePerDay, [Validators.required]],
      voltageChangePerDay: [this.rack.voltageChangePerDay, [Validators.required]],
      temperature: [this.rack.temperature, [Validators.required]],
      voltageId: [this.rack.voltage.id, [Validators.required]],
    }));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;
    if (this.isLoading) return;
    const formValue: RackForm = this.recoveryForm.value;
    this.isLoading = true;

    this._rackService.update(this.rack.id, formValue).subscribe({
      next: (value) => {
        this.dialogRef.close();
        this.recoveryForm.reset();
        const toastMessage = this._translate.instant("toasts.edit-rack");
        this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
      },
      error: (err: ErrorModel) => {
        this._formErrorUtil.errorHandle(err, this.recoveryForm);
      }
    });

  }
}
