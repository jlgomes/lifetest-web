import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageModel } from "@core/domain/models/page-model";
import { UserModel } from "@core/domain/models/user-model";
import { UserService } from "@core/domain/services/user.service";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subject, takeUntil } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UsersDialogFormComponent } from "../components/users-dialog-form/users-dialog-form.component";
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { checkAccessCode } from "@core/infra/utils/check-Access-code";
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  protected readonly checkAccessCode = checkAccessCode;
  protected appRoutes = appRoutes;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  }
  protected page!: PageModel<UserModel>;
  protected dataSources: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>([]);
  protected displayedColumns: string[] = ['name', 'email', 'profile', 'action'];

  constructor(
    private dialog: MatDialog,
    private _userService: UserService,
    private _translate: TranslateService,
    private titleService: Title,
    private _toast: ToastService,
  ) {
    const pageTitle = _translate.instant("page-title.users")
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

  private initDataPage() {
    this._userService.pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        this.page = data;
        this.dataSources = new MatTableDataSource<UserModel>(this.page.content);
      });
  }

  protected handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dataSources.filter = input.value;
  }

  protected pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.initDataPage();
  }

  public create(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = {
      title: "users-dialog.title-register"
    };
    const dialogRefEdit = this.dialog.open(UsersDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public view(element: UserModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = {
      element,
      title: "users-dialog.title-view",
      disabled: true
    };
    const dialogRefEdit = this.dialog.open(UsersDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public edit(element: UserModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = {
      element,
      title: "users-dialog.title-edit"
    };
    const dialogRefEdit = this.dialog.open(UsersDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public delete(element: UserModel): void {
    const deleteItem = (id: string) => {
      this._userService.delete(id).subscribe(() => this.initDataPage());
      const toastMessage = this._translate.instant("toasts.delete-user");
      this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: element.id,
      name: element.name,
      title: "users-dialog.title-delete",
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

  public forgotPassword(email: string): void {
    this._userService.forgotPassword({ email: email }).subscribe();
    const toastMessage = this._translate.instant('users.email-toast');
    this._toast.show(toastMessage, TypeToastEnum.INFO);
  }

}
