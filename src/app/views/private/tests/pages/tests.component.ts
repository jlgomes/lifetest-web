import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { PageModel } from "@core/domain/models/page-model";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { TestModel } from "@core/domain/models/test-model";
import { TestService } from "@core/domain/services/test.service";
import { Title } from '@angular/platform-browser';
import { checkAccessCode } from "@core/infra/utils/check-Access-code";
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { SlotComponent } from '../../dashboard/components/slot/slot.component';
import { SlotModel } from '@core/domain/models/slot-model';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit, OnDestroy {
  protected readonly checkAccessCode = checkAccessCode;
  protected appRoutes = appRoutes;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  }
  protected page!: PageModel<TestModel>;
  protected dataSources: MatTableDataSource<TestModel> = new MatTableDataSource<TestModel>([]);
  protected displayedColumns: string[] = ['status', 'created at', 'product', 'client', 'position', 'slot', 'action'];

  constructor(
    private dialog: MatDialog,
    private _testService: TestService,
    private _translate: TranslateService,
    private titleService: Title,
    private _toast: ToastService,
  ) {
    const pageTitle = _translate.instant("page-title.register-tests");
    this.titleService.setTitle(pageTitle);
  }

  ngOnInit(): void {
    this.dataSources.paginator = this.paginator;
    this.initDataPage();
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dataSources.filter = input.value;
  }

  private initDataPage() {
    this._testService.pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        this.page = data;
        this.dataSources = new MatTableDataSource<TestModel>(this.page.content);
        this.dataSources.filterPredicate = (data: TestModel, filter: string) => {
          const columns = {
            product: data.product.model.toLowerCase(),
            client: data.product.client.name.toLowerCase(),
            rack: data.slot.rack.name,
            slot: ('Slot ' + data.slot.name).toLowerCase(),
          };
          filter = filter.toLowerCase();

          return false
            || columns.product.includes(filter)
            || columns.client.includes(filter)
            || columns.rack.includes(filter)
            || columns.slot.includes(filter)
            ;
        };
      });
  }


  public pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.initDataPage();
  }

  public delete(id: string): void {
    const deleteItem = (id: string, name: string) => {
      this._testService.delete(id).subscribe(() => this.initDataPage());
      const toastMessage = this._translate.instant("toasts.delete-test");
      this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id,
      title: "common.delete",
      subtitle: "dialogs.cannot-be-undone",
      btnConfirmLabel: "common.delete",
      btnCancelLabel: "common.cancel",
      callback: deleteItem,
    };
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    const dialogRefEdit = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public view(item: TestModel): void {
    this._testService
      .findInfoById(item.id)
      .subscribe((slot: SlotModel) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.enterAnimationDuration = '150ms';
        dialogConfig.exitAnimationDuration = '150ms';
        dialogConfig.width = '550px';
        dialogConfig.data = slot;
        const dialogRef = this.dialog.open(SlotComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => this.initDataPage());
      });
  }

}
