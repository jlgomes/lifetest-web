import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageRequestForm } from '@core/domain/forms/page-request-form';
import { PageModel } from '@core/domain/models/page-model';
import { checkAccessCode } from '@core/infra/utils/check-Access-code';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MaintenanceModel } from '@core/domain/models/maintenance-model';
import { MaintenanceService } from '@core/domain/services/maintenance.service';
import { MaintenanceModalFormComponent } from '../../components/maintenance-modal-form/maintenance-modal-form.component';
import { appRoutes } from '@helpers/constants/path-rest-constants';
import { generateMaintenanceReport } from './maintenance-pdf-export';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { MaintenanceModalDoneComponent } from '../../components/maintenance-modal-done/maintenance-modal-done.component';

@Component({
  selector: 'app-maintenance-registers',
  templateUrl: './maintenance-registers.component.html',
  styleUrls: ['./maintenance-registers.component.scss'],
})
export class MaintenanceRegistersComponent implements OnInit, OnDestroy {
  protected readonly checkAccessCode = checkAccessCode;
  protected appRoutes = appRoutes;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  };
  protected page!: PageModel<MaintenanceModel>;
  protected dataSources: MatTableDataSource<MaintenanceModel> =
    new MatTableDataSource<MaintenanceModel>([]);
  protected displayedColumns: string[] = [
    'rack',
    'slot',
    'status',
    'type',
    'date',
    'maintenance-period',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private _maintenanceService: MaintenanceService,
    private _translate: TranslateService,
    private titleService: Title
  ) {
    const pageTitle = _translate.instant('page-title.maintenance');
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

  private initDataPage() {
    this._maintenanceService
      .pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        this.page = data;
        this.dataSources = new MatTableDataSource<MaintenanceModel>(
          this.page.content
        );
      });
  }

  public pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.initDataPage();
  }

  public delete(element: MaintenanceModel): void {
    const deleteItem = () =>
      this._maintenanceService
        .delete(element.id)
        .subscribe(() => this.initDataPage());

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: element.id,
      name: `Slot ${element.slot.name}, Rack ${element.slot.rack.name}`,
      title: 'maintenance.dialog.title-delete',
      subtitle: 'dialogs.cannot-be-undone',
      btnConfirmLabel: 'common.delete',
      btnCancelLabel: 'common.cancel',
      callback: deleteItem,
    };
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    const dialogRefEdit = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public create(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      title: 'maintenance.dialog.title-register',
    };
    const dialogRefEdit = this.dialog.open(
      MaintenanceModalFormComponent,
      dialogConfig
    );
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public exportReport(element: MaintenanceModel) {
    generateMaintenanceReport(element, this._translate);
  }

  public markAsDone(element: MaintenanceModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      element,
      name: `Slot ${element.slot.name}, Rack ${element.slot.rack.name}`,
      title: 'maintenance.dialog.mark-as-done',
      subtitle: 'dialogs.cannot-be-undone',
      btnConfirmLabel: 'common.mark',
      btnCancelLabel: 'common.cancel',
    };
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    const dialogRefEdit = this.dialog.open(
      MaintenanceModalDoneComponent,
      dialogConfig
    );
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }
}
