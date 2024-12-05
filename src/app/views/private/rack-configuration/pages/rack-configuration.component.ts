import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RackModel } from '@core/domain/models/rack-model';
import { VoltageModel } from '@core/domain/models/voltage-model';
import { RackService } from '@core/domain/services/rack.service';
import { VoltageService } from '@core/domain/services/voltage.service';
import { appRoutes } from '@helpers/constants/path-rest-constants';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-configuration-rack',
  templateUrl: './rack-configuration.component.html',
  styleUrls: ['./rack-configuration.component.scss']
})
export class RackConfigurationComponent implements OnInit, OnDestroy {
  protected appRoutes = appRoutes;

  protected racks: RackModel[] = [];
  protected voltages: VoltageModel[] = [];
  private _destroy$ = new Subject();

  constructor(
    private titleService: Title,
    private _translate: TranslateService,
    private _voltageService: VoltageService,
    private _rackService: RackService,
  ) {
    const pageTitle = _translate.instant("page-title.register-racks");
    this.titleService.setTitle(pageTitle);
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  protected getRacks() {
    this._rackService
      .findAll()
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        // sort by rack name
        data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        this.racks = data;
      });
  }

  ngOnInit(): void {
    this._voltageService.findAll().subscribe(data => { this.voltages = data });
    this.getRacks();
  }

}
