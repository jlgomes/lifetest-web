import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogModel } from '@core/domain/models/dialog-model';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { ErrorModel } from '@core/domain/models/error-model';
import { MaintenanceService } from '@core/domain/services/maintenance.service';
import { MaintenanceForm } from '@core/domain/forms/maintenance-form';
import dayjs from 'dayjs';
import {
  MaintenanceModel,
  MaintenanceTypes,
} from '@core/domain/models/maintenance-model';
import { RackService } from '@core/domain/services/rack.service';
import { SlotService } from '@core/domain/services/slot.service';
import { RackModel } from '@core/domain/models/rack-model';
import { SlotModel } from '@core/domain/models/slot-model';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-maintenance-modal-form',
  templateUrl: './maintenance-modal-form.component.html',
  styleUrls: ['./maintenance-modal-form.component.scss'],
  providers: [NgxMaskPipe],
})
export class MaintenanceModalFormComponent implements OnInit {
  recoveryForm!: FormGroup;
  id?: string;
  title!: string;
  protected isLoading: boolean = false;
  protected maintenanceTypes = Object.keys(MaintenanceTypes).map((key) => {
    return { key, text: this._translate.instant(key) };
  });
  protected rackOptions: RackModel[] = [];
  protected slots: SlotModel[] = [];
  protected slotOptions: SlotModel[] = [];
  protected dateMask: string = 'd0/M0/0000';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: DialogModel<MaintenanceModel>,
    private dialogRef: MatDialogRef<MaintenanceModalFormComponent>,
    private fb: FormBuilder,
    private _maintenanceService: MaintenanceService,
    private _formErrorUtil: FormErrorUtil,
    private _rackService: RackService,
    private _slotsService: SlotService,
    private _translate: TranslateService,
    private inputMask: NgxMaskPipe
  ) {
    this.recoveryForm = this.initForm();
    this.id = this.data?.id;
    this.title = this.data?.title ?? '';
  }

  ngOnInit(): void {
    this._rackService.findAll().subscribe((data) => {
      this.rackOptions = data;
    });

    this._slotsService.findAll().subscribe((data) => {
      this.slots = data;
    });
  }

  changeRackEvent(event: MatSelectChange): void {
    this.slotOptions = this.slots.filter(
      (slot) => slot.rack.id === event.value
    );
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      rack: ['', [Validators.required]],
      slot: ['', [Validators.required]],
      type: ['', [Validators.required]],
      date: [dayjs(new Date()).format('DD/MM/YYYY'), [Validators.required]],
      deadlineDate: [
        dayjs(new Date()).format('DD/MM/YYYY'),
        [Validators.required],
      ],
      observation: [''],
    }));
  }

  onSubmit(): void {
    const deadline = this.inputMask.transform(
      this.recoveryForm.value.deadlineDate,
      this.dateMask
    );

    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;
    if (this.isLoading) return;
    const formValue: MaintenanceForm = {
      slotId: this.recoveryForm.value.slot,
      maintenanceType: this.recoveryForm.value.type,
      deadlineDate: dayjs(deadline, 'DD/MM/YYYY').format(
        'YYYY-DD-MMTHH:mm:ss[Z]' // Don't know why but the lib isn't formatting correctly so I swapped the DD and MM order
      ),
      observation: this.recoveryForm.value.observation,
    };

    this.isLoading = true;
    let result = this._maintenanceService.save(formValue).subscribe({
      next: () => {
        this.dialogRef.close();
        this.recoveryForm.reset();
        this.isLoading = false;
      },
      error: (err: ErrorModel) => {
        console.log(err);
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
