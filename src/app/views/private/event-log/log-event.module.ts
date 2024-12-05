import { DatetimePipe } from 'src/app/shared/pipes/datetime/datetime.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogEventComponent } from './pages/log-event.component';
import { LogEventRoutingModule } from './log-event-routing.module';
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "../../../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { LogEventDialogViewComponent } from './components/log-event-dialog-view/log-event-dialog-view.component';
import { AttributeTableComponent } from './components/attribute-table/attribute-table.component';
import { ComparisonTableComponent } from './components/comparison-table/comparison-table.component';


@NgModule({
  declarations: [
    LogEventComponent,
    LogEventDialogViewComponent,
    AttributeTableComponent,
    ComparisonTableComponent,
  ],
  imports: [
    CommonModule,
    LogEventRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    SharedModule,
    TranslateModule,
    DatetimePipe,
  ]
})
export class LogEventModule { }
