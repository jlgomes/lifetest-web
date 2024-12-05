import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductService } from '@core/domain/services/product.service';
import { ClientModel } from '@core/domain/models/client-model';
import { ClientService } from '@core/domain/services/client.service';
import { ProductForm } from '@core/domain/forms/product-form';
import { ErrorModel } from '@core/domain/models/error-model';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { MediaService } from '@core/domain/services/media.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { ProductModel } from '@core/domain/models/product-model';
import { DialogModel } from '@core/domain/models/dialog-model';
import { supportedImageMimeTypes } from '@core/infra/utils/files-util';
import { ProductsCropDialogComponent } from '../products-crop-dialog/products-crop-dialog.component';
import { ProductsCaptureDialogComponent } from '../products-capture-dialog/products-capture-dialog.component';
import { Subscription } from 'rxjs';
import { CropData } from '../../model/crop-data';
import { DelimitationAreaLedImageForm } from '../../model/delimitaion-area-led-imagem-form';
import { Checkboxes } from '../../model/checkboxes';

type checkboxesKeyTypes =
  | 'hasLeds'
  | 'hasEthernetPorts'
  | 'hasLed2G'
  | 'hasLed5G'
  | 'hasLedPower';

@Component({
  selector: 'app-clients-dialog-form',
  templateUrl: './products-dialog-form.component.html',
  styleUrls: ['./products-dialog-form.component.scss'],
})
export class ProductsDialogFormComponent implements OnInit {
  private product!: ProductModel;
  private minNumberPorts: number = 1;
  private maxNumberPorts: number = 4;
  private cropData: any;
  private subscription: Subscription | undefined;

  @ViewChild('fileInputRef')
  protected fileInputRef!: ElementRef<HTMLInputElement>;
  protected title!: string;
  protected recoveryForm!: FormGroup;
  protected checkboxes: Checkboxes = {
    hasEthernetPorts: true,
    hasLeds: true,
    hasLed2G: true,
    hasLed5G: true,
    hasLedPower: true,
  };
  protected disabled: boolean = false;
  protected isLoading: boolean = false;
  protected imagePreviewURL: string | null = null;
  protected selectOptionsClient: ClientModel[] = [];
  protected selectOptionsType = [
    {
      text: 'Horizontal',
      value: 'HORIZONTAL',
    },
    {
      text: 'Vertical',
      value: 'VERTICAL',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: DialogModel<ProductModel>,
    private dialogRef: MatDialogRef<ProductsDialogFormComponent>,
    private fb: FormBuilder,
    private _productService: ProductService,
    private _clientService: ClientService,
    private _formErrorUtil: FormErrorUtil,
    private _mediaService: MediaService,
    private _translate: TranslateService,
    private _toast: ToastService,
    public dialog: MatDialog
  ) {
    this.product = this.data.element;
    this.disabled = this.data?.disabled ?? false;
    this.title = this.data?.title ?? '';

    if (this.product) {
      if (this.product.numberPorts > 0) this.checkboxes.hasEthernetPorts = true;
      else {
        this.checkboxes.hasEthernetPorts = false;
        // Assigning the maximum number of ports to bypass validation checks, otherwise products with 0 ports wouldn't function
        this.product.numberPorts = this.maxNumberPorts;
      }

      if (
        this.product.hasLed2G ||
        this.product.hasLed5G ||
        this.product.hasLedPower
      )
        this.checkboxes.hasLeds = true;
      else this.checkboxes.hasLeds = false;
      this.checkboxes.hasLed2G = this.product.hasLed2G;
      this.checkboxes.hasLed5G = this.product.hasLed5G;
      this.checkboxes.hasLedPower = this.product.hasLedPower;
    }
  }

  ngOnInit(): void {
    this.recoveryForm = this.initForm();
    this.loadClients();

    if (this.product) this.viewImage();
  }

  initForm(): FormGroup {
    if (this.product)
      return (this.recoveryForm = this.fb.group({
        model: [this.product.model, [Validators.required]],
        clientId: [this.product.client.id, [Validators.required]],
        type: [this.product.type, [Validators.required]],
        color: [this.product.color, [Validators.required]],
        numberPorts: [
          this.product.numberPorts,
          [
            Validators.required,
            Validators.min(this.minNumberPorts),
            Validators.max(this.maxNumberPorts),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        hasLed2G: [this.product.hasLed2G, Validators.required],
        hasLed5G: [this.product.hasLed5G, Validators.required],
        hasLedPower: [this.product.hasLedPower, Validators.required],
      }));
    else
      return (this.recoveryForm = this.fb.group({
        model: ['', [Validators.required]],
        clientId: ['', [Validators.required]],
        type: ['', [Validators.required]],
        color: ['#000', [Validators.required]],
        numberPorts: [
          this.maxNumberPorts,
          [
            Validators.required,
            Validators.min(this.minNumberPorts),
            Validators.max(this.maxNumberPorts),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        hasLed2G: [true, Validators.required],
        hasLed5G: [true, Validators.required],
        hasLedPower: [true, Validators.required],
      }));
  }

  protected onSubmit(): void {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;
    if (this.isLoading) return;

    const formValue: ProductForm = {
      ...this.recoveryForm.value,
      imageBase64: this.imagePreviewURL,
      delimitationAreaLeds: this.cropData ? this.transformCropDataToJava(this.cropData) : this.product.delimitationAreaLeds,
      numberPorts: this.checkboxes.hasEthernetPorts
        ? this.recoveryForm.value.numberPorts
        : 0,
      hasLed2G: this.checkboxes.hasLeds && this.checkboxes.hasLed2G,
      hasLed5G: this.checkboxes.hasLeds && this.checkboxes.hasLed5G,
      hasLedPower: this.checkboxes.hasLeds && this.checkboxes.hasLedPower,
    };

    this.isLoading = true;
    if (this.product) {
      this._productService.update(this.product.id, formValue).subscribe({
        next: () => {
          this.dialogRef.close();
          this.recoveryForm.reset();
          const toastMessage = this._translate.instant('toasts.edit-product');
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
          this.isLoading = false;
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        },
      });
    } else {
      this._productService.save(formValue).subscribe({
        next: () => {
          this.dialogRef.close();
          this.recoveryForm.reset();
          const toastMessage = this._translate.instant(
            'toasts.register-product'
          );
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
          this.isLoading = false;
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        },
      });
    }
  }

  public onChangeCheckbox(
    data: { checked: boolean },
    key: checkboxesKeyTypes
  ): void {
    this.checkboxes[key] = !this.checkboxes[key];
    if (key == 'hasLeds') {
      this.checkboxes.hasLed2G = this.checkboxes[key];
      this.checkboxes.hasLed5G = this.checkboxes[key];
      this.checkboxes.hasLedPower = this.checkboxes[key];
    }
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files![0];

    if (selectedFile) {
      if (!supportedImageMimeTypes.includes(selectedFile.type)) {
        this._toast.show(
          this._translate.instant('toasts.invalid-image'),
          TypeToastEnum.WARNING
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewURL = e.target?.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  private viewImage(): void {
    if (this.product.mediaId) {
      this._mediaService.getMedia(this.product.mediaId).subscribe((media) => {
        this.imagePreviewURL = media.base64Data;
      });
    }
  }

  private loadClients(): void {
    this._clientService.findAll().subscribe((clients) => {
      this.selectOptionsClient = clients;
    });
  }

  protected openFileInput(): void {
    this.fileInputRef.nativeElement.click();
  }

  protected openDelimitationDialog() {
    console.log(this.checkboxes);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.width = '800px';
    dialogConfig.data = {
      title: 'products-dialog.title-register',
      element: this.product,
      imagePreviewURL: this.imagePreviewURL,
      checkboxes: this.checkboxes,
    };
    const dialogRefEdit = this.dialog.open(
      ProductsCropDialogComponent,
      dialogConfig
    );
    this.subscription = dialogRefEdit.afterClosed().subscribe(cropData => {
      if (cropData) {
        this.cropData = cropData;
      }
    });
  }
  
  transformCropDataToJava(cropData: CropData): DelimitationAreaLedImageForm[] {
    return Object.entries(cropData).map(([key, value]) => ({
      description: key, // Usa a chave como descrição
      height: value.height,
      left: value.left,
      top: value.top,
      width: value.width,
    }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  protected openCaptureDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = {
      title: 'products-dialog.title-register',
      element: this.product,
    };
    const dialogRefEdit = this.dialog.open(
      ProductsCaptureDialogComponent,
      dialogConfig
    );
  }

  protected closeDialog(): void {
    this.dialogRef.close();
  }
}
