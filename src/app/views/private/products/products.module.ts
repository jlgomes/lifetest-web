import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsDialogFormComponent } from './components/products-dialog-form/products-dialog-form.component';
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CdkTableModule} from "@angular/cdk/table";
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { ProductsCropDialogComponent } from './components/products-crop-dialog/products-crop-dialog.component';
import { MatRippleModule } from '@angular/material/core';
import { ProductsCaptureDialogComponent } from './components/products-capture-dialog/products-capture-dialog.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsDialogFormComponent,
    ProductsCropDialogComponent,
    ProductsCaptureDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
    MatCheckboxModule,
    MatRippleModule,
    AngularCropperjsModule,
  ],
  exports: [ProductsComponent, SharedModule]
})
export class ProductsModule {}
