import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateUserRoutingModule } from './activate-user-routing.module';
import { ActivateUserComponent } from './pages/activate-user.component';

import { ContainerFullComponent } from '@shared/components/container-full/container-full.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ActivateUserComponent
  ],
  imports: [
    CommonModule,
    ActivateUserRoutingModule,
    ContainerFullComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TranslateModule
  ]
})
export class ActivateUserModule { }
