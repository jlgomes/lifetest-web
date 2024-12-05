import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './pages/users.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedModule} from "../../../shared/shared.module";
import {UsersDialogFormComponent} from "./components/users-dialog-form/users-dialog-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UsersComponent,
    UsersDialogFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
  exports: [UsersComponent,SharedModule]
})
export class UsersModule {
}
