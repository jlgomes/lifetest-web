import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TelemetryComponent } from './pages/telemetry.component';
import { TelemetryDialogViewComponent } from './components/telemetry-dialog-view/telemetry-dialog-view.component';
import { DatetimePipe } from 'src/app/shared/pipes/datetime/datetime.pipe';
import { LedTelemetriesListComponent } from './components/led-telemetries-list/led-telemetries-list.component';
import { ProgressSpinnerComponent } from '@shared/components/progress-spinner/progress-spinner.component';
import { MatRippleModule } from '@angular/material/core';
import { PingTelemetriesListComponent } from './components/ping-telemetries-list/ping-telemetries-list.component';

@NgModule({
  declarations: [
    TelemetryComponent,
    TelemetryDialogViewComponent,
    LedTelemetriesListComponent,
    PingTelemetriesListComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatRippleModule,
    SharedModule,
    TranslateModule,
    DatetimePipe,
    ProgressSpinnerComponent,
  ],
})
export class TelemetryModule {}
