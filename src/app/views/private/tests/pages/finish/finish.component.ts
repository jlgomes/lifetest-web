import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '@core/domain/services/test.service';
import { ErrorModel } from '@core/domain/models/error-model';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SlotModel, createEmptySlot } from '@core/domain/models/slot-model';
import { RepairForm } from '@core/domain/forms/repair-form';
import { RepairService } from '@core/domain/services/repair.service';
import { Subject, takeUntil } from 'rxjs';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit, OnDestroy {
  protected appRoutes = appRoutes;

  protected recoveryForm!: FormGroup;
  protected repairData!: RepairForm;
  protected formData: SlotModel = createEmptySlot();
  protected isFullFilled: boolean = false;
  protected count: number = 0;
  protected fieldActive: string = '';
  protected testId: string = '';
  private _destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private _formErrorUtil: FormErrorUtil,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _translate: TranslateService,
    private titleService: Title,
    private _testService: TestService,
    private _repairService: RepairService,
  ) {
    const pageTitle = _translate.instant(
      'page-title.register-tests-new-reading'
    );
    this.titleService.setTitle(pageTitle);
    this.recoveryForm = this.initForm();
    this.recoveryForm.valueChanges.subscribe(() => {
      this.verifyValues();
    });
  }

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe((params) => {
      this.testId = params.get('id') ?? '';
    });
    this._testService.findInfoById(this.testId).subscribe({
      next: (response) => {
        this.formData = response;
      },
    });
    this.repairData = this._repairService.getObject();
    if (this.repairData === undefined)
      this.repairData = { testID: '', arquivo8D: null, status: 'PENDING' };
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      product: '',
      rack: '',
      rackbox: '',
      box: '',
      font: '',
    }));
  }

  verifyValues() {
    if (this._formErrorUtil.isSampleInvalidForm(this.recoveryForm)) {
      this.isFullFilled = false;
      return;
    }
    this.isFullFilled = true;
  }

  finishTest() {
    this._testService.finish(this.testId).subscribe({
      next: () => {
        this._router.navigateByUrl(appRoutes.CONTROL_PANEL);
      },
      error: (err: ErrorModel) =>
        this._formErrorUtil.errorHandle(err, this.recoveryForm),
    });
  }

  onSubmit() {
    if (this.canSubmit()) return;
    if (this.repairData.testID !== '') {
      this._repairService
        .save(this.repairData)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: () => {
            this._repairService.clearData();
            this.finishTest();
          },
          error: (err: ErrorModel) =>
            this._formErrorUtil.errorHandle(err, this.recoveryForm),
        });
    } else {
      this.finishTest();
    }
  }

  setActive(fieldName: string): void {
    this.fieldActive = fieldName;
  }

  canActive(fieldName: string): boolean {
    return this.fieldActive === fieldName;
  }

  checkFied(fieldName: string): boolean {
    return this.recoveryForm.value[fieldName] !== '';
  }

  onCancel() {
    this._router.navigateByUrl(appRoutes.CONTROL_PANEL);
  }

  canSubmit(): boolean {
    if (
      this.checkFied('font') &&
      this.checkFied('product') &&
      this.checkFied('box') &&
      this.recoveryForm.value['font'] ===
      this.formData.test?.serialPowerSource &&
      this.recoveryForm.value['product'] ===
      this.formData.test?.serialProduct &&
      this.recoveryForm.value['box'] === this.formData.test?.serialBox
    ) {
      return false;
    }
    return true;
  }
}
