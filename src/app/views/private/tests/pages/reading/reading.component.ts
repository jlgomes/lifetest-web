import { appRoutes } from './../../../../../shared/helpers/constants/path-rest-constants';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DataRegisterTestModel, DataRegisterTestService} from '@core/domain/services/data-register-test.service';
import { TestService } from '@core/domain/services/test.service';
import {TestForm} from "@core/domain/forms/test-form";
import {FormErrorUtil} from "@core/infra/utils/form-error-util";
import { Router } from '@angular/router';
import {ErrorModel} from "@core/domain/models/error-model";
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import { testsRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {
  protected appRoutes = appRoutes;
  protected recoveryForm!: FormGroup;
  protected formData: DataRegisterTestModel = {} as DataRegisterTestModel;
  protected isFullFilled: boolean = false;
  protected count: number = 0;
  protected fieldActive: string = "";

  constructor(
    private fb: FormBuilder,
    private _dataRegisterTestService: DataRegisterTestService,
    private _testService: TestService,
    private _formErrorUtil: FormErrorUtil,
    private _router: Router,
    private _translate: TranslateService,
    private titleService: Title,
    private el: ElementRef,
  ) {
      const pageTitle = _translate.instant("page-title.register-tests-new-reading");
      this.titleService.setTitle(pageTitle);

    this.recoveryForm = this.initForm();
    this.recoveryForm.valueChanges.subscribe(_ => {
      this.verifyValues();
    })
  }

  ngOnInit(): void {
    const data = this._dataRegisterTestService.getData();
    if (!data) {
      this._router.navigate([testsRoutes.TEST_REGISTRATION]);
      return;
    }
    this.formData = data;
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      product: ['', [Validators.required]],
      rack: ['', [Validators.required]],
      rackbox: ['', [Validators.required]],
      box: ['', [Validators.required]],
      font: ['', [Validators.required]],
    }));
  }

  verifyValues() {
    if(this._formErrorUtil.isSampleInvalidForm(this.recoveryForm)){
      this.isFullFilled = false;
      return;
    }
    this.isFullFilled = true;
  }

  onSubmit() {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;
    let test:TestForm = {
      serialProduct: this.recoveryForm.value.product,
      serialBox: this.recoveryForm.value.box,
      serialPowerSource: this.recoveryForm.value.font,
      duration: Number(this.formData.duration),
      productId: this.formData.product.id,
      slotId: this.formData.slots[this.count].id
    };

    this._testService.save(test).subscribe(
      {
        next: ()=>{
          if(this.count >= (this.formData.slots.length - 1)){
            this._router.navigateByUrl(appRoutes.CONTROL_PANEL);
          }
          this.isFullFilled = false;
          this.count++;
        },
        error: (err: ErrorModel) => {this._formErrorUtil.errorHandle(err, this.recoveryForm)},
        complete: () => {
          this.recoveryForm.reset();
          var elementFocus = this.el.nativeElement.querySelector('[ng-reflect-name="product"]');
          elementFocus.focus();
        }

      }
    );
  }


  setActive(fieldName: string): void{
    this.fieldActive = fieldName;
  }
  canActive(fieldName: string): boolean{
    return this.fieldActive === fieldName;
  }

  checkFied(fieldName: string): boolean{
    return this.recoveryForm.value[fieldName] !== "" && this.recoveryForm.value[fieldName] !== null;
  }

  onCancel(){
    this._router.navigate([testsRoutes.TEST_REGISTRATION]);
  }
}
