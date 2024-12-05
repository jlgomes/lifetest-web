import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogModel } from '@core/domain/models/dialog-model';
import { ProductModel } from '@core/domain/models/product-model';
import { ProductsDialogFormComponent } from '../products-dialog-form/products-dialog-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MediaService } from '@core/domain/services/media.service';
import { CropperComponent } from 'angular-cropperjs';
import { DelimitationAreaLedImageForm } from '../../model/delimitaion-area-led-imagem-form';
import { Checkboxes } from '../../model/checkboxes';

interface LedDelimitations {
  led2g: Cropper.CropBoxData;
  led5g: Cropper.CropBoxData;
  ledPower: Cropper.CropBoxData;
}

@Component({
  selector: 'app-products-crop-dialog',
  templateUrl: './products-crop-dialog.component.html',
  styleUrls: ['./products-crop-dialog.component.scss'],
})
export class ProductsCropDialogComponent implements OnInit {
  @ViewChild('angularCropper')
  protected angularCropper!: CropperComponent;

  private product!: ProductModel;
  protected title!: string;
  protected disabled: boolean = false;
  protected isLoading: boolean = false;
  protected recoveryForm!: FormGroup;
  protected imagePreviewURL: string | null = null;
  protected activeTab: number = 1;
  protected rippleColor: string = '#E6FAFF30';
  protected lastCropBox!: Cropper.CropBoxData;
  protected checkboxes: Checkboxes | null = null;

  // TODO make integration with the API
  private cropData: LedDelimitations = {
    led2g: {
      left: 0,
      top: 0,
      width: 523,
      height: 614,
    },
    led5g: {
      left: 801,
      top: 322,
      width: 200,
      height: 345,
    },
    ledPower: {
      left: 790,
      top: 0,
      width: 1130,
      height: 365,
    },
  };

  protected config: Cropper.Options<HTMLImageElement> = {
    zoomable: false,
    movable: false,
    toggleDragModeOnDblclick: false,
    minCropBoxWidth: 25,
    minCropBoxHeight: 25,
    ready: () => {
      if (this.checkboxes?.hasLed2G) {
        this.calculateCoords(this.cropData.led2g);
      } else if (this.checkboxes?.hasLed5G) {
        this.calculateCoords(this.cropData.led5g);
      } else if (this.checkboxes?.hasLedPower) {
        this.calculateCoords(this.cropData.ledPower);
      }
    },
    crop: (event: Cropper.CropEvent) => {
      const box: Cropper.CropBoxData = {
        left: Math.round(event.detail.x),
        top: Math.round(event.detail.y),
        width: Math.round(event.detail.width),
        height: Math.round(event.detail.height),
      };
      this.lastCropBox = box;
    },
    cropend: (event: Cropper.CropEndEvent) => {
      switch (this.activeTab) {
        case 1:
          this.cropData.led2g = this.lastCropBox;
          break;
        case 2:
          this.cropData.led5g = this.lastCropBox;
          break;
        case 3:
          this.cropData.ledPower = this.lastCropBox;
          break;
      }
    },
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: DialogModel<ProductModel>,
    private dialogRef: MatDialogRef<ProductsDialogFormComponent>,
    private fb: FormBuilder,
    private _mediaService: MediaService,
    public dialog: MatDialog
  ) {
    this.product = this.data.element;
    this.cropData = this.product ? 
      this.transformCropDataToJavaScript(this.product.delimitationAreaLeds) : this.cropData;
    this.imagePreviewURL = this.data.imagePreviewURL;
    this.checkboxes = this.data.checkboxes;
    this.disabled = this.data?.disabled ?? false;
    this.title = this.data?.title ?? '';
  }

  ngOnInit(): void {
    this.recoveryForm = this.initForm();
    if (this.product) this.viewImage();
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({}));
  }

  private viewImage(): void {
    if (this.product.mediaId && !this.imagePreviewURL) {
      this._mediaService.getMedia(this.product.mediaId).subscribe((media) => {
        this.imagePreviewURL = media.base64Data;
      });
    }
  }

  protected onSubmit(): void {
    this.dialogRef.close(this.cropData);
  }

  protected setTab(tab: number) {
    this.activeTab = tab;

    switch (tab) {
      case 1:
        this.calculateCoords(this.cropData.led2g);
        break;
      case 2:
        this.calculateCoords(this.cropData.led5g);
        break;
      case 3:
        this.calculateCoords(this.cropData.ledPower);
        break;
    }
  }
  
  transformCropDataToJavaScript(
    delimitationAreas: DelimitationAreaLedImageForm[]
  ): LedDelimitations {
    const result: Partial<LedDelimitations> = {};
  
    delimitationAreas.forEach((area) => {
      if (area.description in result || ['led2g', 'led5g', 'ledPower'].includes(area.description)) {
        result[area.description as keyof LedDelimitations] = {
          height: area.height,
          left: area.left,
          top: area.top,
          width: area.width,
        };
      } else {
        console.warn(`Unexpected description: ${area.description}`);
      }
    });
  
    return result as LedDelimitations;
  }

  protected closeDialog(): void {
    this.dialogRef.close();
  }

  private calculateCoords(box: Cropper.CropBoxData) {
    const imageData: Cropper.ImageData =
      this.angularCropper.cropper.getImageData();
    const ratio = imageData.width / imageData.naturalWidth;

    const coords: Cropper.CropBoxData = {
      left: box.left * ratio,
      top: box.top * ratio,
      width: box.width * ratio,
      height: box.height * ratio,
    };
    this.angularCropper.cropper.setCropBoxData({ ...coords });
  }
}
