import { NgModule } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

import { SharedModule } from "src/app/shared/shared.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ModemComponent } from './components/modem/modem.component';
import { ModelCardComponent } from './components/model-card/model-card.component';
import { SlotComponent } from './components/slot/slot.component';

import { TestedDatePipe } from './components/slot/pipes/tested-date.pipe';
import { TotalDatePipe } from './components/slot/pipes/total-date.pipe';
import { EntryDatePipe } from './components/slot/pipes/entry-date.pipe';
import { ExitDatePipe } from './components/slot/pipes/exit-date.pipe';
import { ErrorDatePipe } from './components/slot/pipes/error-date.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CameraViewComponent } from './components/camera-view/camera-view.component';
import { ProgressSpinnerComponent } from '@shared/components/progress-spinner/progress-spinner.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ModemComponent,
        ModelCardComponent,
        SlotComponent,
        CameraViewComponent,
        // Pipes
        TestedDatePipe,
        TotalDatePipe,
        EntryDatePipe,
        ExitDatePipe,
        ErrorDatePipe,
    ],
    exports: [
      DashboardComponent,
      ModemComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        NgForOf,
        TranslateModule,
        MatIconModule,
        MatTooltipModule,
        ProgressSpinnerComponent,
    ],
})
export class DashboardModule { }
