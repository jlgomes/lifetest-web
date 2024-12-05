import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './pages/change-password.component';

import { ContainerFullComponent } from '@shared/components/container-full/container-full.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ContainerFullComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TranslateModule
  ]
})
export class ChangePasswordModule { }
