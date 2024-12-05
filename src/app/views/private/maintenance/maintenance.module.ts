import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceRegistersComponent } from './pages/maintenance-registers/maintenance-registers.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaintenanceModalFormComponent } from './components/maintenance-modal-form/maintenance-modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatetimePipe } from 'src/app/shared/pipes/datetime/datetime.pipe';
import { MaintenanceModalDoneComponent } from './components/maintenance-modal-done/maintenance-modal-done.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    MaintenanceRegistersComponent,
    MaintenanceModalFormComponent,
    MaintenanceModalDoneComponent,
  ],
  providers:[provideNgxMask()],
  imports: [
    CommonModule,
    SharedModule,
    MaintenanceRoutingModule,
    MatIconModule,
    TranslateModule,
    DashboardModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    DatetimePipe,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class MaintenanceModule {}
