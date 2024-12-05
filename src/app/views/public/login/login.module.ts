import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login.component';
import { RouterModule } from '@angular/router';
import { ContainerFullComponent } from '@shared/components/container-full/container-full.component';

import { LoginRoutingModule } from './login-routing.module';

import { SharedModule } from '../../../shared/shared.module';
import {MatInputModule} from "@angular/material/input";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoginRoutingModule,
    SharedModule,
    ContainerFullComponent,
    MatInputModule,
    TranslateModule
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
