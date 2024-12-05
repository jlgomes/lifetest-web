import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './pages/profiles.component';
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TranslateModule } from '@ngx-translate/core';
import { ProfileModalFormComponent } from './components/profile-modal-form/profile-modal-form.component';
import {MatTreeModule} from '@angular/material/tree';
import { ProfileModalTreeComponent } from './components/profile-modal-tree/profile-modal-tree.component';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfileModalFormComponent,
    ProfileModalTreeComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
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
    MatExpansionModule,
    MatTreeModule
  ],
  exports: [ProfilesComponent, SharedModule]
})
export class ProfilesModule { }
