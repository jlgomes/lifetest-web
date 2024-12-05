import { ConfirmationDialogModel } from './../../../core/domain/models/dialog-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  id?: string;
  name?: string;
  title!: string;
  subtitle!: string;
  btnCancel?: boolean;
  btnClose?: boolean;
  btnConfirmLabel!: string;
  btnCancelLabel!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: ConfirmationDialogModel<any>,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private _translate: TranslateService,
  ) {
    this.id = this.data?.id;
    this.name = this.data?.name;
    this.title = this.data?.title ?? "";
    this.subtitle = this.data?.subtitle ?? "";
    this.btnCancel = this.data.btnCancel ?? true;
    this.btnClose = this.data?.btnClose ?? true;
    this.btnConfirmLabel = this.data?.btnConfirmLabel ?? "dialogs.btn-register";
    this.btnCancelLabel = this.data?.btnCancelLabel ?? "common.cancel";

    this.title = _translate.instant(this.title);
    if (this.name)
      this.title = `${this.title}: ${this.name}`;
  }

  ngOnInit(): void {
    this.view();
  }

  protected onSubmit(): void {
    this.data?.callback(this.id);
    this.dialogRef.close();
  }

  private view(): void {
    if (!this.id) return;
  }

  protected closeDialog(): void {
    this.dialogRef.close();
  }
}
