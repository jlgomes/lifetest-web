import { Component } from '@angular/core';
import { PageModel } from '@core/domain/models/page-model';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { appRoutes } from '@helpers/constants/path-rest-constants';
import { LedTelemetryModel } from '@core/domain/models/led-telemetry-model';

@Component({
  selector: 'app-tests',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss'],
})
export class TelemetryComponent {
  protected appRoutes = appRoutes;

  protected activeTab: number = 1;
  protected rippleColor: string = '#E6FAFF30';
  protected filter: string = '';

  protected page!: PageModel<LedTelemetryModel>;
  protected dataSources: MatTableDataSource<LedTelemetryModel> =
    new MatTableDataSource<LedTelemetryModel>([]);
  protected displayedColumns: string[] = [
    'product',
    'rack',
    'slot',
    'led2G',
    'led5G',
    'ledPower',
    'date',
    'action',
  ];

  constructor(private _translate: TranslateService) {}

  setTab(tab: number) {
    this.activeTab = tab;
  }

  handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filter = input.value;
  }
}
