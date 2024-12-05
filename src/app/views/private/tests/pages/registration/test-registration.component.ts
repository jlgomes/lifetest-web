import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SlotService } from '@core/domain/services/slot.service';
import { ProductService } from '@core/domain/services/product.service';
import { Router } from '@angular/router';
import { DataRegisterTestService } from '@core/domain/services/data-register-test.service';
import { ProductModel } from "@core/domain/models/product-model";
import { FormErrorUtil } from "@core/infra/utils/form-error-util";
import { ToastService } from "@core/domain/services/toast.service";
import { TypeToastEnum } from "@core/domain/enums/type-toast-enum";
import { Title } from '@angular/platform-browser';
import { SlotModel } from '@core/domain/models/slot-model';
import dayjs from 'dayjs';
import { appRoutes, testsRoutes } from '@helpers/constants/path-rest-constants';

type rackActiveType = "Rack1" | "Rack2";
type optionsType = { id: string | number, name: string };

interface BoxModel extends SlotModel {
  checked: boolean;
}

@Component({
  selector: 'app-test-registration',
  templateUrl: './test-registration.component.html',
  styleUrls: ['./test-registration.component.scss'],
})
export class TestRegistrationComponent implements OnInit {
  protected appRoutes = appRoutes;
  protected recoveryForm!: FormGroup;
  protected disabled: boolean = false;
  protected box1: BoxModel[] = [];
  protected box2: BoxModel[] = [];
  protected box3: BoxModel[] = [];
  protected box4: BoxModel[] = [];
  protected box5: BoxModel[] = [];
  protected box6: BoxModel[] = [];
  protected box7: BoxModel[] = [];
  protected box8: BoxModel[] = [];
  protected rackActive: rackActiveType = "Rack1";
  protected products: ProductModel[] = [];
  protected checkAll: boolean = false;
  private maxNumberOfDays: number = 1000;
  private minNumberOfDays: number = 1;

  constructor(
    private fb: FormBuilder,
    private _slotService: SlotService,
    private _productService: ProductService,
    private _router: Router,
    private _register: DataRegisterTestService,
    private _formErrorUtil: FormErrorUtil,
    private _translate: TranslateService,
    private _toastService: ToastService,
    private titleService: Title,
  ) {
    const pageTitle = _translate.instant("page-title.register-tests-new");
    this.titleService.setTitle(pageTitle);
    this.recoveryForm = this.initForm();
    this.recoveryForm.valueChanges.subscribe(item => this.calculateEnd(item));
  }

  ngOnInit() {
    this._slotService.findAll().subscribe(data => this.fillBoxes(data));
    this._productService.findAll().subscribe(data => this.products = data);
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      startdate: dayjs(new Date()).format('DD/MM/YYYY'),
      enddate: '',
      modelId: ['', [Validators.required]],
      time: ['',
        [
          Validators.required,
          Validators.min(this.minNumberOfDays),
          Validators.max(this.maxNumberOfDays),
          Validators.pattern("^[0-9]*$"),
        ]
      ],
    }));
  }

  handleCheckAll(data: { checked: boolean }) {
    this.checkAll = data.checked;

    this.box1.forEach(item => { if (!item.status && !item.inMaintenance) item.checked = data.checked });
    this.box2.forEach(item => { if (!item.status && !item.inMaintenance) item.checked = data.checked });
    this.box3.forEach(item => { if (!item.status && !item.inMaintenance) item.checked = data.checked });
    this.box4.forEach(item => { if (!item.status && !item.inMaintenance) item.checked = data.checked });
    this.box5.forEach(item => { if (!item.status && !item.inMaintenance) item.checked = data.checked });
    this.box6.forEach(item => { if (!item.status && !item.inMaintenance) item.checked = data.checked });
    this.box7.forEach(item => { if (!item.status && !item.inMaintenance) item.checked = data.checked });
    this.box8.forEach(item => { if (!item.status && !item.inMaintenance) item.checked = data.checked });
  }

  handleCheckChange(box: number, index: number) {
    if (box == 1) this.box1[index].checked = !this.box1[index].checked;
    if (box == 2) this.box2[index].checked = !this.box2[index].checked;
    if (box == 3) this.box3[index].checked = !this.box3[index].checked;
    if (box == 4) this.box4[index].checked = !this.box4[index].checked;
    if (box == 5) this.box5[index].checked = !this.box5[index].checked;
    if (box == 6) this.box6[index].checked = !this.box6[index].checked;
    if (box == 7) this.box7[index].checked = !this.box7[index].checked;
    if (box == 8) this.box8[index].checked = !this.box8[index].checked;
    this.checkAll = false;
  }

  changeRack(rack: rackActiveType) {
    this.rackActive = rack;
  }

  private clearBox() {
    this.box1 = [];
    this.box2 = [];
    this.box3 = [];
    this.box4 = [];
    this.box5 = [];
    this.box6 = [];
    this.box7 = [];
    this.box8 = [];
  }

  fillBoxes(data: SlotModel[]) {
    this.clearBox();
    data.forEach(item => {
      const num = Number(item.name) - 1;
      const position = item.rack.name;
      if (position === "01") {
        if (num <= 11) {
          this.box1.push({ ...item, checked: false });
        } else if (num <= 23) {
          this.box2.push({ ...item, checked: false });
        } else if (num <= 35) {
          this.box3.push({ ...item, checked: false });
        } else if (num <= 47) {
          this.box4.push({ ...item, checked: false });
        }
      } else if (position === "02") {
        if (num <= 11) {
          this.box5.push({ ...item, checked: false });
        } else if (num <= 23) {
          this.box6.push({ ...item, checked: false });
        } else if (num <= 35) {
          this.box7.push({ ...item, checked: false });
        } else if (num <= 47) {
          this.box8.push({ ...item, checked: false });
        }
      }
    })
  }

  calculateEnd(value: any) {
    if (value.time != undefined) {

      if (isNaN(value.time) || value.time < 0 || value.time > this.maxNumberOfDays){
        // prevents showing a invalid date
        value.time = 0;
      }

      this.recoveryForm
        .get('enddate')
        ?.setValue(
          dayjs(new Date()).add(value.time * 24, 'hours').format('DD/MM/YYYY'),
          { emitEvent: false }
        );
    }
  }

  onSubmit() {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;
    const product = this.products.find(value => value.id == this.recoveryForm.value.modelId);
    const slots: SlotModel[] = [
      ...this.box1.filter(item => item.checked),
      ...this.box2.filter(item => item.checked),
      ...this.box3.filter(item => item.checked),
      ...this.box4.filter(item => item.checked),
      ...this.box5.filter(item => item.checked),
      ...this.box6.filter(item => item.checked),
      ...this.box7.filter(item => item.checked),
      ...this.box8.filter(item => item.checked),
    ];
    if (slots.length == 0) {
      const toastMessage = this._translate.instant("toasts.select-slot");
      this._toastService.show(toastMessage, TypeToastEnum.INFO);
      return;
    }
    this._register.setData({
      slots: slots,
      product: product!,
      duration: this.recoveryForm.value.time,
      start: this.recoveryForm.value.startdate,
      end: this.recoveryForm.value.enddate,
    });
    this._router.navigateByUrl(testsRoutes.TEST_READING);
  }

  onCancel() {
    this._router.navigateByUrl(appRoutes.CONTROL_PANEL);
  }
}
