import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RackConfigurationComponent } from './pages/rack-configuration.component';
import { RackComponent } from './components/rack/rack.component';
import { RackConfigModalComponent } from './components/rack-config-modal/rack-config-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    RackConfigurationComponent,
    RackComponent,
    RackConfigModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
  ]
})
export class RackConfigurationModule { }
