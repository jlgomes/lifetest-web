import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RackConfigModalComponent } from '../rack-config-modal/rack-config-modal.component';
import { VoltageModel } from '@core/domain/models/voltage-model';
import { RackModel } from '@core/domain/models/rack-model';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent {
  @Input() rack!: RackModel;
  @Input() voltages: VoltageModel[] = [];
  @Output() updateRack: EventEmitter<string> = new EventEmitter<string>;

  constructor(private dialog: MatDialog) { }

  configureRack() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { rack: this.rack, voltages: this.voltages };
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    const dialogRefEdit = this.dialog.open(RackConfigModalComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.updateRack.emit());
  }

  formatVoltage(voltage: number) {
    return `${voltage}v`
  }

  formatTemperature(temperature: number) {
    return `${temperature}°C`
  }

}
