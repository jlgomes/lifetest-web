import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { PageModel } from "@core/domain/models/page-model";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { LogEventModel } from "@core/domain/models/log-event-model";
import { LogEventService } from "@core/domain/services/log-event.service";
import { formateDateUtil } from "@core/infra/utils/formate-date-util";
import { Title } from '@angular/platform-browser';
import { LogEventDialogViewComponent } from '../components/log-event-dialog-view/log-event-dialog-view.component';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-tests',
  templateUrl: './log-event.component.html',
  styleUrls: ['./log-event.component.scss']
})
export class LogEventComponent implements OnInit, OnDestroy {
  protected appRoutes = appRoutes;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  }
  protected page!: PageModel<LogEventModel>;
  protected dataSources: MatTableDataSource<LogEventModel> = new MatTableDataSource<LogEventModel>([]);
  protected displayedColumns: string[] = ['module', 'date', 'message', 'updatedBy', 'action'];

  constructor(
    private dialog: MatDialog,
    private _logEventService: LogEventService,
    private _translate: TranslateService,
    private titleService: Title,
  ) {
    const pageTitle = _translate.instant("page-title.event-log");
    this.titleService.setTitle(pageTitle);
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.dataSources.paginator = this.paginator;
    this.initDataPage();
  }

  handleFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dataSources.filter = input.value;
  }

  private initDataPage(): void {
    this._logEventService.pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        this.page = data;
        this.dataSources = new MatTableDataSource<LogEventModel>(this.page.content);
        this.dataSources.filterPredicate = (data: LogEventModel, filter: string) => {
          const columns = {
            module: this._translate.instant('event.modules.' + data.module).toLowerCase(),
            date: data.date.toLowerCase(),
            message: this._translate.instant('event.messages.' + data.message).toLowerCase(),
            user: data.updatedBy?.toLowerCase()
          };
          filter = filter.toLowerCase();

          return false
            || columns.module.includes(filter)
            || columns.date.includes(filter)
            || columns.message.includes(filter)
            || columns.user?.includes(filter)
            ;
        };
      });
  }

  public pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.initDataPage();
  }

  protected readonly formateDateUtil = formateDateUtil;

  public view(item: LogEventModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = item;
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.width = '700px';
    const dialogRefEdit = this.dialog.open(LogEventDialogViewComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }
}
