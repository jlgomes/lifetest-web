import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './pages/not-found.component';
import { ContainerFullComponent } from '@shared/components/container-full/container-full.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotFoundRoutingModule,
    ContainerFullComponent,
    TranslateModule,
  ]
})
export class NotFoundModule { }
