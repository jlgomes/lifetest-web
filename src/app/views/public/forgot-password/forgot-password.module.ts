import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './pages/forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ContainerFullComponent } from '@shared/components/container-full/container-full.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ForgotPasswordRoutingModule,
    ContainerFullComponent,
    SharedModule,
    TranslateModule
  ],
  exports: [ForgotPasswordComponent],
})
export class ForgotPasswordModule { }
