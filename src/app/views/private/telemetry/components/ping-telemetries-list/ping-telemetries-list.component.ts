import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageRequestForm } from '@core/domain/forms/page-request-form';
import { PageModel } from '@core/domain/models/page-model';
import { TelemetryService } from '@core/domain/services/telemetry.service';
import { formateDateUtil } from '@core/infra/utils/formate-date-util';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { TelemetryDialogViewComponent } from '../telemetry-dialog-view/telemetry-dialog-view.component';
import { PingTelemetryModel } from '@core/domain/models/ping-telemetry-model';

@Component({
  selector: 'app-ping-telemetries-list',
  templateUrl: './ping-telemetries-list.component.html',
  styleUrls: ['./ping-telemetries-list.component.scss'],
})
export class PingTelemetriesListComponent implements OnChanges {
  protected readonly formateDateUtil = formateDateUtil;

  @Input()
  public filter: String = '';
  @ViewChild(MatPaginator)
  protected paginator!: MatPaginator;

  private _destroy$ = new Subject();
  protected page!: PageModel<PingTelemetryModel>;
  protected dataSources: MatTableDataSource<PingTelemetryModel> =
    new MatTableDataSource<PingTelemetryModel>([]);
  private pageable: PageRequestForm = {
    size: 10,
  };
  protected displayedColumns: string[] = [
    'product',
    'rack',
    'slot',
    'pingP1',
    'pingP2',
    'pingP3',
    'pingP4',
    'date',
    'action',
  ];
  protected isLoading!: Boolean;

  constructor(
    private dialog: MatDialog,
    private _telemetryService: TelemetryService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.dataSources.paginator = this.paginator;
    this.initDataPage();
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.dataSources.filter = changes['filter'].currentValue;
    }
  }

  handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dataSources.filter = input.value;
  }

  private initDataPage() {
    this.isLoading = true;
    this._telemetryService
      .pingPageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        this.page = data;
        this.dataSources = new MatTableDataSource<PingTelemetryModel>(
          this.page.content
        );
        this.isLoading = false;

        this.dataSources.filterPredicate = (
          data: PingTelemetryModel,
          filter: string
        ) => {
          const columns = {
            product: data.test.product.model.toLowerCase(),
            serial: data.test.serialProduct.toLowerCase(),
            rack: data.test.slot.rack.name.toLowerCase(),
            slot: data.test.slot.name.toLowerCase(),
            pingP1: (data.pingP1 ? 'Ok' : 'ERROR').toLowerCase(),
            pingP2: (data.pingP2 ? 'Ok' : 'ERROR').toLowerCase(),
            pingP3: (data.pingP3 ? 'Ok' : 'ERROR').toLowerCase(),
            pingP4: (data.pingP4 ? 'Ok' : 'ERROR').toLowerCase(),
            date: formateDateUtil(data.createdAt).toLowerCase(),
          };
          filter = filter.toLowerCase();

          return (
            false ||
            columns.product.includes(filter) ||
            columns.serial.includes(filter) ||
            columns.rack.includes(filter) ||
            columns.slot?.includes(filter) ||
            columns.pingP1?.includes(filter) ||
            columns.pingP2?.includes(filter) ||
            columns.pingP3?.includes(filter) ||
            columns.pingP4?.includes(filter) ||
            columns.date?.includes(filter)
          );
        };
      });
  }

  public pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.initDataPage();
  }

  public view(item: PingTelemetryModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = item;
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.width = '600px';
    const dialogRefEdit = this.dialog.open(
      TelemetryDialogViewComponent,
      dialogConfig
    );
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  protected statusColor(status: boolean): string {
    return (status ? '#84E388' : '#D42121') + '!important';
  }
}
