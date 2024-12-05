import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './pages/tests.component';
import { TestsRoutingModule } from './tests-routing.module';
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "../../../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { TestRegistrationComponent } from './pages/registration/test-registration.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ReadingComponent } from './pages/reading/reading.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FinishComponent } from './pages/finish/finish.component';




@NgModule({
  declarations: [
    TestsComponent,
    TestRegistrationComponent,
    ReadingComponent,
    FinishComponent
  ],
  imports: [
    CommonModule,
    TestsRoutingModule,
    DashboardModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class TestsModule { }
