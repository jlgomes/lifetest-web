import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistersComponent } from './pages/registers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { RegistersRoutingModule } from './registers-routing.module';



@NgModule({
  declarations: [
    RegistersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    TranslateModule,
    RegistersRoutingModule,
    RouterModule
  ]
})
export class RegistersModule { }
