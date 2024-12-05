import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairComponent } from './pages/repair.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepairRegisterComponent } from './pages/register/repair-register/repair-register.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { CdkTableModule } from "@angular/cdk/table";
import { MatIconModule } from '@angular/material/icon';
import { RepairRoutingModule } from './repair-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TestedDatePipe } from './pages/register/repair-register/pipes/tested-date.pipe';
import { TotalDatePipe } from './pages/register/repair-register/pipes/total-date.pipe';
import { EntryDatePipe } from './pages/register/repair-register/pipes/entry-date.pipe';
import { ExitDatePipe } from './pages/register/repair-register/pipes/exit-date.pipe';
import { ErrorDatePipe } from './pages/register/repair-register/pipes/error-date.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    RepairComponent,
    RepairRegisterComponent,
    // Pipes
    TestedDatePipe,
    TotalDatePipe,
    EntryDatePipe,
    ExitDatePipe,
    ErrorDatePipe
  ],
  imports: [
    CommonModule,
    RepairRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    MatIconModule,
    MatCheckboxModule,
  ]
})
export class RepairModule { }
