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
import { LedTelemetryModel } from '@core/domain/models/led-telemetry-model';
import { PageModel } from '@core/domain/models/page-model';
import { TelemetryService } from '@core/domain/services/telemetry.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { TelemetryDialogViewComponent } from '../telemetry-dialog-view/telemetry-dialog-view.component';
import { formateDateUtil } from '@core/infra/utils/formate-date-util';

@Component({
  selector: 'app-led-telemetries-list',
  templateUrl: './led-telemetries-list.component.html',
  styleUrls: ['./led-telemetries-list.component.scss'],
})
export class LedTelemetriesListComponent implements OnChanges {
  protected readonly formateDateUtil = formateDateUtil;

  @Input()
  public filter: String = '';
  @ViewChild(MatPaginator)
  protected paginator!: MatPaginator;

  private _destroy$ = new Subject();
  protected page!: PageModel<LedTelemetryModel>;
  protected dataSources: MatTableDataSource<LedTelemetryModel> =
    new MatTableDataSource<LedTelemetryModel>([]);
  private pageable: PageRequestForm = {
    size: 10,
  };
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
      .ledPageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        this.page = data;
        this.dataSources = new MatTableDataSource<LedTelemetryModel>(
          this.page.content
        );
        this.isLoading = false;

        this.dataSources.filterPredicate = (
          data: LedTelemetryModel,
          filter: string
        ) => {
          const columns = {
            product: data.test.product.model.toLowerCase(),
            serial: data.test.serialProduct.toLowerCase(),
            rack: data.test.slot.rack.name.toLowerCase(),
            slot: data.test.slot.name.toLowerCase(),
            led2G: (data.led2G ? 'Ok' : 'ERROR').toLowerCase(),
            led5G: (data.led5G ? 'Ok' : 'ERROR').toLowerCase(),
            ledPower: (data.ledPower ? 'Ok' : 'ERROR').toLowerCase(),
            date: formateDateUtil(data.createdAt).toLowerCase(),
          };
          filter = filter.toLowerCase();

          return (
            false ||
            columns.product.includes(filter) ||
            columns.serial.includes(filter) ||
            columns.rack.includes(filter) ||
            columns.slot?.includes(filter) ||
            columns.led2G?.includes(filter) ||
            columns.led5G?.includes(filter) ||
            columns.ledPower?.includes(filter) ||
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

  public view(item: LedTelemetryModel) {
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
