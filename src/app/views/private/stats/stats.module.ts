import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './pages/stats.component';
import { StatsRoutingModule } from './stats-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    StatsComponent,
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule,
    MatIconModule,
    TranslateModule,
    MatTooltipModule,
  ],
})
export class StatsModule {}
