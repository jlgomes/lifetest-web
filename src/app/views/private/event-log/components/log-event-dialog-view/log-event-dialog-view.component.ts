import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LogEventModel } from '@core/domain/models/log-event-model';
import { TypeEventLog } from '@core/domain/enums/type-event-log';
import { GenericObject } from '@shared/types/generic-object-type';


@Component({
  selector: 'app-log-event-dialog-view',
  templateUrl: './log-event-dialog-view.component.html',
  styleUrls: ['./log-event-dialog-view.component.scss']
})
export class LogEventDialogViewComponent {
  protected oldData!: GenericObject;
  protected newData!: GenericObject;
  protected actionTaken!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: LogEventModel,
    private dialogRef: MatDialogRef<LogEventDialogViewComponent>,
    private _translate: TranslateService,
  ) {
    this.oldData = JSON.parse(data.lastedData);
    this.newData = JSON.parse(data.savedData);

    switch (data.name) {
      case TypeEventLog.CREATE:
        this.actionTaken = 'event.messages.create';
        break;
      case TypeEventLog.UPDATE:
        this.actionTaken = 'event.messages.update';
        break;
      case TypeEventLog.DELETE:
        this.actionTaken = 'event.messages.delete';
        break;
      case TypeEventLog.ENABLE:
        this.actionTaken = 'event.messages.enable';
        break;
      case TypeEventLog.DISABLE:
        this.actionTaken = 'event.messages.disable';
        break;
      case TypeEventLog.FINISH:
        this.actionTaken = 'event.messages.finish';
        break;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

