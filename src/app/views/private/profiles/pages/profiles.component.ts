import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { PageModel } from "@core/domain/models/page-model";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ProfileModel } from "@core/domain/models/profile-model";
import { ProfileService } from "@core/domain/services/profile.service";
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileModalFormComponent } from '../components/profile-modal-form/profile-modal-form.component';
import { Title } from '@angular/platform-browser';
import { checkAccessCode } from "@core/infra/utils/check-Access-code";
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { ToastService } from '@core/domain/services/toast.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy {
  protected readonly checkAccessCode = checkAccessCode;
  protected appRoutes = appRoutes;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  }
  protected page!: PageModel<ProfileModel>;
  protected dataSources: MatTableDataSource<ProfileModel> = new MatTableDataSource<ProfileModel>([]);
  protected displayedColumns: string[] = ['name', 'action'];

  constructor(
    private dialog: MatDialog,
    private _profileService: ProfileService,
    private _translate: TranslateService,
    private titleService: Title,
    private _toast: ToastService,
  ) {
    const pageTitle = _translate.instant("page-title.profiles");
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

  protected handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dataSources.filter = input.value;
  }

  private initDataPage() {
    this._profileService.pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        this.page = data;
        this.dataSources = new MatTableDataSource<ProfileModel>(this.page.content);
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
    dialogConfig.width = '800px';
    dialogConfig.data = {
      title: "profiles-dialog.title-register"
    };
    const dialogRefEdit = this.dialog.open(ProfileModalFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public edit(element: ProfileModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.width = '800px';
    dialogConfig.data = {
      element,
      title: "profiles-dialog.title-edit"
    };
    const dialogRefEdit = this.dialog.open(ProfileModalFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public delete(element: ProfileModel): void {
    const deleteItem = (id: string) => {
      this._profileService.delete(id).subscribe(() => this.initDataPage());
      const toastMessage = this._translate.instant("toasts.delete-profile");
      this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: element.id,
      name: element.name,
      title: "profiles-dialog.title-delete",
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
