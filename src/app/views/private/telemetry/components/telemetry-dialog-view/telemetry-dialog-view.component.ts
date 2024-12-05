import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TelemetryModel } from '@core/domain/models/telemetry-model';

@Component({
  selector: 'app-telemetry-dialog-view',
  templateUrl: './telemetry-dialog-view.component.html',
  styleUrls: ['./telemetry-dialog-view.component.scss'],
})
export class TelemetryDialogViewComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: TelemetryModel,
    private dialogRef: MatDialogRef<TelemetryDialogViewComponent>,
    private _translate: TranslateService,
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
