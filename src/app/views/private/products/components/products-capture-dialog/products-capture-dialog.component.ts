import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DialogModel } from '@core/domain/models/dialog-model';
import { MaintenanceTypes } from '@core/domain/models/maintenance-model';
import { ProductModel } from '@core/domain/models/product-model';
import { RackModel } from '@core/domain/models/rack-model';
import { SlotModel } from '@core/domain/models/slot-model';
import { RackService } from '@core/domain/services/rack.service';
import { SlotService } from '@core/domain/services/slot.service';
import { ToastService } from '@core/domain/services/toast.service';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-capture-dialog',
  templateUrl: './products-capture-dialog.component.html',
  styleUrls: ['./products-capture-dialog.component.scss'],
})
export class ProductsCaptureDialogComponent implements OnInit {
  protected product!: ProductModel;
  protected capture!: string;

  protected recoveryForm!: FormGroup;
  protected maintenanceTypes = Object.keys(MaintenanceTypes).map((key) => {
    return { key, text: this._translate.instant(key) };
  });
  protected rackOptions: RackModel[] = [];
  protected slots: SlotModel[] = [];
  protected slotOptions: SlotModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: DialogModel<ProductModel>,
    private dialogRef: MatDialogRef<ProductsCaptureDialogComponent>,
    private fb: FormBuilder,
    private _rackService: RackService,
    private _slotsService: SlotService,
    private _formErrorUtil: FormErrorUtil,
    private _translate: TranslateService,
    private _toast: ToastService,
    public dialog: MatDialog
  ) {
    this.product = this.data.element;
    this.recoveryForm = this.recoveryForm = this.fb.group({
      rack: [''],
      slot: [''],
    });
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

  protected closeDialog(): void {
    this.dialogRef.close();
  }
}
