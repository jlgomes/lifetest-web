import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';

import { ReportsComponent } from './pages/reports.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatRippleModule } from '@angular/material/core';

import { ProgressSpinnerComponent } from '@shared/components/progress-spinner/progress-spinner.component';
import { GenerateReportsDialogComponent } from './pages/components/generate-reports-dialog/generate-reports-dialog.component';

@NgModule({
  declarations: [ReportsComponent, GenerateReportsDialogComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    FormsModule,
    MatRippleModule,
    TranslateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    MatIconModule,
    MatTooltipModule,
    ProgressSpinnerComponent,
  ],
})
export class ReportsModule {}
