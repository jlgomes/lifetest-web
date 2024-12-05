import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientsRoutingModule} from './clients-routing.module';
import {ClientsComponent} from './pages/clients.component';
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {CdkTableModule} from "@angular/cdk/table";
import {ClientsDialogFormComponent} from "./components/clients-dialog-form/clients-dialog-form.component";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsDialogFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
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
    TranslateModule
  ],
  exports: [ClientsComponent, SharedModule]
})
export class ClientsModule {
}
