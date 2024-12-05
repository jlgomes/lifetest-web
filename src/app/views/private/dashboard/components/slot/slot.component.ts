import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SlotModel } from '@core/domain/models/slot-model';
import { Router } from '@angular/router';
import { RepairService } from '@core/domain/services/repair.service';
import { TestService } from '@core/domain/services/test.service';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { TranslateService } from '@ngx-translate/core';
import { CameraViewComponent } from '../camera-view/camera-view.component';
import { ProductModel } from '@core/domain/models/product-model';
import { BooleanStringUndefinedOrNull, PingTelemetryModel, getPingTelemetryValue } from '@core/domain/models/ping-telemetry-model';
import { LedTelemetryModel } from '@core/domain/models/led-telemetry-model';
import { testsRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  @Output() onStartTest: EventEmitter<string> = new EventEmitter();
  protected data!: SlotModel;
  protected product: ProductModel | undefined;
  protected lastPingTelemetry: PingTelemetryModel | undefined | null;
  protected lastPingError: PingTelemetryModel | undefined | null;
  protected lastLedTelemetry: LedTelemetryModel | undefined | null;
  protected lastLedError: LedTelemetryModel | undefined | null;
  protected numberOfLeds: number = 0;
  protected numberOfPorts: number = 0;
  protected ports: BooleanStringUndefinedOrNull[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: SlotModel,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<SlotComponent>,
    private _router: Router,
    private _repairService: RepairService,
    private _testService: TestService,
    private _toastService: ToastService,
    private _translateService: TranslateService,
  ) {
    this.data = data;
    this.product = data.test?.product;
    this.lastPingTelemetry = data.test?.lastPingTelemetry;
    this.lastPingError = data.test?.lastPingError;
    this.lastLedTelemetry = data.test?.lastLedTelemetry;
    this.lastLedError = data.test?.lastLedError;
    console.log(data);
  }

  ngOnInit(): void {
    this.numberOfPorts = this.data.test?.product.numberPorts ?? 0;
    for (let i: number = 1; i <= this.numberOfPorts; i++) {
      const key = `pingP${i}`;
      const data: BooleanStringUndefinedOrNull = this.data.test?.lastPingTelemetry
        ? getPingTelemetryValue(this.data.test?.lastPingTelemetry, key)
        : undefined;
      this.ports.push(data);
    }

    if (this.product?.hasLedPower)
      this.numberOfLeds++;
    if (this.product?.hasLed2G)
      this.numberOfLeds++;
    if (this.product?.hasLed5G)
      this.numberOfLeds++;
  }

  protected pingErrorList() {
    const pings = [
      this.data.test?.lastPingError?.pingP1,
      this.data.test?.lastPingError?.pingP2,
      this.data.test?.lastPingError?.pingP3,
      this.data.test?.lastPingError?.pingP4,
    ];

    const errorPorts = pings
      .map((ping, index) => (ping ? null : `P${index + 1}`))
      .filter(Boolean);

    return errorPorts.join(', ');
  }

  protected ledErrorList() {
    const leds: string[] = [];

    if (!this.data.test?.lastLedError?.ledPower)
      leds.push('Power');
    if (!this.data.test?.lastLedError?.led2G)
      leds.push('2G');
    if (!this.data.test?.lastLedError?.led5G)
      leds.push('5G');

    return leds.join(', ');
  }

  protected repairProduct() {
    if (this.data.test?.Status == "WITH_ERROR") {
      this._repairService.setObject({
        testID: this.data.test?.id,
        arquivo8D: null,
        status: "PENDING",
      });
      this.dialogRef.close();
      this._router.navigate([testsRoutes.TEST_FINISH , this.data.test?.id]);
    }
  }

  protected exitProduct() {
    this.dialogRef.close();
    this._router.navigate([testsRoutes.TEST_FINISH, this.data.test?.id]);
  }

  protected finishTest() {
    if (this.data?.test?.lastLedError || this.data?.test?.lastPingError) {
      this.repairProduct();
    } else {
      this.exitProduct();
    }
  }

  protected startTest(id: string) {
    this._testService.initializeById(id).subscribe(() => {
      this.dialogRef.close();
      this.onStartTest.emit(id);
      const toastsMessage = this._translateService.instant("toasts.starting-test");
      this._toastService.show(toastsMessage, TypeToastEnum.INFO);
    }
    );
  }

  protected openCameraView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = this.data;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialog.open(CameraViewComponent, dialogConfig);
  }

  protected hasTelemetry() {
    return this.data.test?.lastLedTelemetry || this.data.test?.lastPingTelemetry;
  }

  protected hasError() {
    return this.hasLedError() || this.hasPingError();
  }

  protected hasLedError() {
    return this.data?.test?.lastLedError;
  }

  protected hasPingError() {
    return this.data?.test?.lastPingError;
  }

  protected hasLedTelemetry() {
    return this.lastLedTelemetry;
  }

  protected hasPingTelemetry() {
    return this.lastPingTelemetry;
  }

  protected statusLed(led: 'Power' | '2G' | '5G'): 'sucess' | 'error' | 'empty' {
    if (!this.hasLedTelemetry()) {
      return 'empty';
    }

    let status: boolean | undefined;
    switch (led) {
      case 'Power':
        status = this.lastLedTelemetry?.ledPower;
        break;
      case '2G':
        status = this.lastLedTelemetry?.led2G;
        break;
      case '5G':
        status = this.lastLedTelemetry?.led5G;
        break;
    }

    if (status)
      return 'sucess';
    else
      return 'error';
  }

  protected statusPing(portIndex: number): 'sucess' | 'error' | 'empty' {
    if (!this.hasPingTelemetry()) {
      return 'empty';
    }

    const port: string = `P${portIndex + 1}`;
    let status: boolean | undefined;
    switch (port) {
      case 'P1':
        status = this.lastPingTelemetry?.pingP1;
        break;
      case 'P2':
        status = this.lastPingTelemetry?.pingP2;
        break;
      case 'P3':
        status = this.lastPingTelemetry?.pingP3;
        break;
      case 'P4':
        status = this.lastPingTelemetry?.pingP4;
        break;
    }
    if (status)
      return 'sucess';
    else
      return 'error';
  }

  getStatusMessage(value: BooleanStringUndefinedOrNull): string {
    switch (value) {
      case true:
        return "slot-modal.ok";
      case false:
        return "slot-modal.error";
      case undefined:
        return '-';
      case null:
        return '-';
      default:
        return value;
    }
  }

}
