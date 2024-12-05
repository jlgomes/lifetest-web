import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './pages/control.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ControlComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    TranslateModule,
    RouterModule
  ]
})
export class ControlModule { }
