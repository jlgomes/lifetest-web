import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { PageModel } from "@core/domain/models/page-model";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "@core/domain/services/notification.service";
import { NotificationTestModel } from "@core/domain/models/notification-test-model";
import { Title } from '@angular/platform-browser';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-tests',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  protected appRoutes = appRoutes;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  }
  protected page!: PageModel<NotificationTestModel>;
  protected dataSources: MatTableDataSource<NotificationTestModel> = new MatTableDataSource<NotificationTestModel>([]);
  protected displayedColumns: string[] = ['open', 'product', 'client', 'position', 'slot', 'type', 'date', 'action'];

  constructor(
    private dialog: MatDialog,
    private _notificationService: NotificationService,
    private _translate: TranslateService,
    private titleService: Title,
    private _toast: ToastService,

  ) {
    const pageTitle = _translate.instant("page-title.notifications");
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

  handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dataSources.filter = input.value;
  }

  private initDataPage() {
    this._notificationService.pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        this.page = data;
        this.dataSources = new MatTableDataSource<NotificationTestModel>(this.page.content);
        this.dataSources.filterPredicate = (data: NotificationTestModel, filter: string) => {
          const columns = {
            product: data.test.product.model.toLowerCase(),
            client: data.test.product.client.name.toLowerCase(),
            rack: data.test.slot.rack.name,
            slot: data.test.slot.name.toLowerCase(),
            type: this._translate.instant(data.type == 'ERROR' ? 'notifications.error' : 'notifications.finished').toLowerCase(),
            date: this.formatDate(data.createdAt).toLowerCase(),
          };
          filter = filter.toLowerCase();

          return false
            || columns.product.includes(filter)
            || columns.client.includes(filter)
            || columns.rack.includes(filter)
            || columns.slot.includes(filter)
            || columns.type.includes(filter)
            || columns.date.includes(filter)
            ;
        };
      });
  }

  public pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.initDataPage();
  }

  public markAsRead(element: NotificationTestModel): void {
    const markItem = (id: string, name: string) => {
      this._notificationService.markAsRead(id).subscribe(() => this.initDataPage());
      const toastMessage = this._translate.instant('toasts.marked-notification');
      this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
    };
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: element.id,
      title: 'notifications.mark-as-read',
      subtitle: 'dialogs.cannot-be-undone',
      btnConfirmLabel: 'common.mark',
      btnCancelLabel: 'common.cancel',
      callback: markItem,
    };
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    const dialogRefEdit = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig,
    );
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public formatDate(str: string): string {
    return new Date(str).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }) + ' ' + str.slice(11);
  }
}
