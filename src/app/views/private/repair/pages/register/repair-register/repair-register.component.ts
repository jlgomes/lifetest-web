import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { RepairForm } from '@core/domain/forms/repair-form';
import { ErrorModel } from '@core/domain/models/error-model';
import { RepairService } from '@core/domain/services/repair.service';
import { TestService } from '@core/domain/services/test.service';
import { ToastService } from '@core/domain/services/toast.service';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { TranslateService } from '@ngx-translate/core';
import { SlotModel } from '@core/domain/models/slot-model';
import { RepairModel } from '@core/domain/models/repair-model';
import { ProductModel } from '@core/domain/models/product-model';
import { BooleanStringUndefinedOrNull, PingTelemetryModel, getPingTelemetryValue } from '@core/domain/models/ping-telemetry-model';
import { LedTelemetryModel } from '@core/domain/models/led-telemetry-model';
import { appRoutes } from '@helpers/constants/path-rest-constants';
import { isValidRepairFile } from '@core/infra/utils/files-util';

@Component({
  selector: 'app-repair-register',
  templateUrl: './repair-register.component.html',
  styleUrls: ['./repair-register.component.scss']
})

export class RepairRegisterComponent {
  protected appRoutes = appRoutes;

  protected repairData!: RepairModel;
  protected slotData!: SlotModel;
  protected recoveryForm!: FormGroup;
  protected repairForm?: RepairForm;
  protected id?: string;
  protected title!: string;
  protected disabled: boolean = false;
  protected isLoading: boolean = false;
  protected fileInput?: string;
  protected imagePreviewURL?: string;
  protected selectedFile?: File | null;

  protected product: ProductModel | undefined;
  protected lastPingTelemetry: PingTelemetryModel | undefined | null;
  protected lastPingError: PingTelemetryModel | undefined | null;
  protected lastLedTelemetry: LedTelemetryModel | undefined | null;
  protected lastLedError: LedTelemetryModel | undefined | null;
  protected numberOfLeds: number = 0;
  protected numberOfPorts: number = 0;
  protected ports: BooleanStringUndefinedOrNull[] = [];

  constructor(
    private fb: FormBuilder,
    private _repairService: RepairService,
    private _testService: TestService,
    private _formErrorUtil: FormErrorUtil,
    private _translate: TranslateService,
    private _toast: ToastService,
    private _route: Router,
  ) {
    this.recoveryForm = this.initForm();
    this.id = this._repairService.getData();
  }


  ngOnInit(): void {
    if (this.id) {
      const data = this._repairService.findById(this.id)
        .subscribe(data => {
          this.repairData = data;
          this._testService.findInfoById(data.test.id)
            .subscribe({
                next: (response) => {
                  this.slotData = response;
                  this.product = this.slotData.test?.product;
                  this.lastPingTelemetry = this.slotData.test?.lastPingTelemetry;
                  this.lastPingError = this.slotData.test?.lastPingError;
                  this.lastLedTelemetry = this.slotData.test?.lastLedTelemetry;
                  this.lastLedError = this.slotData.test?.lastLedError;

                  this.numberOfPorts = this.slotData.test?.product.numberPorts ?? 0;
                  for (let i: number = 1; i <= this.numberOfPorts; i++) {
                    const key = `pingP${i}`;
                    const data: BooleanStringUndefinedOrNull = this.slotData.test?.lastPingTelemetry
                    ? getPingTelemetryValue(this.slotData.test?.lastPingTelemetry, key)
                    : undefined;
                    this.ports.push(data);
                  }

                  if (this.product?.hasLedPower)
                    this.numberOfLeds++;
                  if (this.product?.hasLed2G)
                    this.numberOfLeds++;
                  if (this.product?.hasLed5G)
                    this.numberOfLeds++;

                  console.log({repairData: this.repairData, slotData: this.slotData, product: this.product});
                },
                error: (err: ErrorModel) => {
                }
              });
          });
    }
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      model:'',
    }));
  }

  pingErrorList() {
    const pings = [
      this.slotData.test?.lastPingError?.pingP1,
      this.slotData.test?.lastPingError?.pingP2,
      this.slotData.test?.lastPingError?.pingP3,
      this.slotData.test?.lastPingError?.pingP4,
    ];

    const errorPorts = pings
      .map((ping, index) => (ping ? null : `P${index + 1}`))
      .filter(Boolean);

    return errorPorts.join(', ');
  }

  ledErrorList() {
    const leds: any = [];

    if (!this.slotData.test?.lastLedError?.ledPower)
      leds.push('Power');
    if (!this.slotData.test?.lastLedError?.led2G)
      leds.push('2G');
    if (!this.slotData.test?.lastLedError?.led5G)
      leds.push('5G');

    return leds.join(', ');
  }

  onSubmit() {
    let test: string = "";
    let pdf: string = "";

    if (this.isLoading) return;
    if(this.slotData.test?.id && this.imagePreviewURL){
      test = this.slotData.test?.id;
      pdf = this.imagePreviewURL;
    } else { return; }

    const formValue: RepairForm = {
      testID: test,
      arquivo8D: pdf,
      status: "FINISHED",
    };

    this.isLoading = true;
    if (this.id) {
      this._repairService.update(this.id, formValue).subscribe({
        next: () => {
          this.recoveryForm.reset();
          const toastMessage = this._translate.instant("toasts.edit-repair");
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
          this.isLoading = false;
          this._route.navigateByUrl(appRoutes.REPAIR);
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        }
      });
    } else {
      this._repairService.save(formValue).subscribe({
        next: () => {
          this.recoveryForm.reset();
          const toastMessage = this._translate.instant("toasts.register-repair");
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
          this.isLoading = false;
          this._route.navigateByUrl(appRoutes.REPAIR);
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.files) {
      this.selectedFile = eventTarget.files[0];
    }

    if (!isValidRepairFile(this.selectedFile?.type)) {
      this._toast.show(
        this._translate.instant('toasts.invalid-repair'),
        TypeToastEnum.WARNING
      );
      this.selectedFile = null;
      return;
    }
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewURL = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.log('Nenhum arquivo selecionado.');
    }
  }

  cancelRegister() {
    this._route.navigateByUrl(appRoutes.REPAIR);
  }

  protected hasTelemetry() {
    return this.slotData.test?.lastLedTelemetry || this.slotData.test?.lastPingTelemetry;
  }

  protected hasError() {
    return this.hasLedError() || this.hasPingError();
  }

  protected hasLedError() {
    return this.slotData?.test?.lastLedError;
  }

  protected hasPingError() {
    return this.slotData?.test?.lastPingError;
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
