import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StatsService } from '@core/domain/services/stats.service';
import { StatsModel } from '@core/domain/models/stats-model';
import { Title } from '@angular/platform-browser';
import { BarChartData } from '@core/domain/models/reports/bar-chart-data';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  protected appRoutes = appRoutes;

  protected data!: StatsModel;
  protected mostTestedModelsData: BarChartData[] = [];
  protected ledPingErrorsData: BarChartData[] = [];

  constructor(
    private _translate: TranslateService,
    private _statsService: StatsService,
    private titleService: Title
  ) {
    const pageTitle = _translate.instant('page-title.dashboard');
    this.titleService.setTitle(pageTitle);
  }

  async ngOnInit() {
    this._statsService.getStats().subscribe((value) => {
      this.data = value;
    });

    this._statsService
      .getMostTestedModels()
      .subscribe((value: BarChartData[]) => {
        this.mostTestedModelsData = value;
      });

    this._statsService.getLedPingErros().subscribe((value: BarChartData[]) => {
      this.ledPingErrorsData = value;
    });
  }
}
