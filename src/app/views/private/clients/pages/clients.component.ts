import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { PageModel } from "@core/domain/models/page-model";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ClientModel } from "@core/domain/models/client-model";
import { ClientService } from "@core/domain/services/client.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ClientsDialogFormComponent } from "../components/clients-dialog-form/clients-dialog-form.component";
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { checkAccessCode } from "@core/infra/utils/check-Access-code";
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {
  protected readonly checkAccessCode = checkAccessCode;
  protected appRoutes = appRoutes;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  };
  protected page!: PageModel<ClientModel>;
  protected dataSources: MatTableDataSource<ClientModel> = new MatTableDataSource<ClientModel>([]);
  protected displayedColumns: string[] = ['name', 'ipRange', 'action'];

  constructor(
    private dialog: MatDialog,
    private _clientService: ClientService,
    private _translate: TranslateService,
    private titleService: Title,
    private _toast: ToastService,
  ) {
    const pageTitle = _translate.instant("page-title.register-costumers");
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
    this._clientService.pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        this.page = data;
        this.dataSources = new MatTableDataSource<ClientModel>(this.page.content);
      });
  }

  public pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.initDataPage();
  }

  public create(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = {
      title: "clients-dialog.title-register"
    };
    const dialogRefEdit = this.dialog.open(ClientsDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public view(element: ClientModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      element,
      title: "clients-dialog.title-view",
      disabled: true
    };
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    const dialogRefEdit = this.dialog.open(ClientsDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public edit(element: ClientModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      element,
      title: "clients-dialog.title-edit"
    };
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    const dialogRefEdit = this.dialog.open(ClientsDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public delete(element: ClientModel): void {
    const deleteItem = (id: string) => {
      this._clientService.delete(id).subscribe(() => this.initDataPage());
      const toastMessage = this._translate.instant("toasts.delete-client");
      this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: element.id,
      name: element.name,
      title: "clients-dialog.title-delete",
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

}
