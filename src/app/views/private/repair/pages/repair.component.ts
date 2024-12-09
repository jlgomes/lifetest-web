import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageRequestForm } from '@core/domain/forms/page-request-form';
import { PageModel } from '@core/domain/models/page-model';
import { checkAccessCode } from '@core/infra/utils/check-Access-code';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { RepairModel } from '@core/domain/models/repair-model';
import { RepairService } from '@core/domain/services/repair.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { MediaService } from '@core/domain/services/media.service';
import {
  appRoutes,
  repairRoutes,
} from '@helpers/constants/path-rest-constants';
import { getFileExtension } from '@core/infra/utils/files-util';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormErrorUtil } from '@core/infra/utils/form-error-util';
import { DateInterval } from '@shared/components/date-picker/date-picker.component';
import dayjs from 'dayjs';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss'],
})
export class RepairComponent implements OnInit, OnDestroy {
  protected readonly checkAccessCode = checkAccessCode;
  protected appRoutes = appRoutes;
  protected recoveryForm!: FormGroup;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  };
  protected page!: PageModel<RepairModel>;
  protected dataSources: MatTableDataSource<RepairModel> =
    new MatTableDataSource<RepairModel>([]);
  protected displayedColumns: string[] = [
    'falseReject',
    'status',
    'model',
    'rack',
    'slot',
    'action',
  ];

  constructor(
    private _repairService: RepairService,
    private _translate: TranslateService,
    private titleService: Title,
    private _router: Router,
    private dialog: MatDialog,
    private _toast: ToastService,
    private _mediaService: MediaService,
    private fb: FormBuilder,
    private _formErrorUtil: FormErrorUtil
  ) {
    const pageTitle = _translate.instant('page-title.repairs');
    this.titleService.setTitle(pageTitle);
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.setIntervalInitial();
    this.initForm();
    this.dataSources.paginator = this.paginator;
    this.fetchDataPage();
  }

  setIntervalInitial() {
    const { start, end } = this.getIntervalInitial();
    this.pageable.endDate = end.toUTCString();
    this.pageable.startDate = start.toUTCString();
  }

  getIntervalInitial() {
    const today = dayjs();
    const lastWeek = today.subtract(1, 'week');

    return {
      end: today.toDate(),
      start: lastWeek.toDate(),
    };
  }

  initForm(): void {
    this.recoveryForm = this.fb.group({
      date: [''],
      test: [''],
    });
  }

  onChangeInterval(value: Partial<DateInterval>) {
    this.pageable.startDate = value.start?.toUTCString();
    this.pageable.endDate = value.end?.toUTCString();
    this.fetchDataPage();
  }

  onChangeTime(key: 'startTime' | 'endTime', value: string) {
    this.pageable[key] = value;
    this.refetchChangeTime(value);
  }

  refetchChangeTime(value: string) {
    const isFilled = value.length > 4;
    const isEmpty = value.length === 0;

    if (isEmpty || isFilled) {
      this.fetchDataPage();
    }
  }

  handleFilterChange(event: Event) {
    const data = event.target as HTMLInputElement;
    this.dataSources.filter = data.value;
  }

  private fetchDataPage() {
    this._repairService
      .pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        this.page = data;
        this.dataSources = new MatTableDataSource<RepairModel>(
          this.page.content
        );

        this.dataSources.filterPredicate = (
          data: RepairModel,
          filter: string
        ) => {
          const columns = {
            status: data.status.toLowerCase(),
            model: data.test.product.model.toLowerCase(),
            rack: data.test.slot.rack.name,
            slot: ('Slot ' + data.test.slot.name).toLowerCase(),
          };
          filter = filter.toLowerCase();

          return (
            false ||
            columns.status.includes(filter) ||
            columns.model.includes(filter) ||
            columns.rack.includes(filter) ||
            columns.slot.includes(filter)
          );
        };
      });
  }

  public getMedia(element: RepairModel) {
    const id = element.mediaID;
    if (!id) return;

    this._mediaService.getMedia(id).subscribe((mediaData) => {
      const parts = mediaData.base64Data.split(',');
      const base64Data = parts[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      let extension: string = getFileExtension(mediaData.media.type);
      link.download = `${id}${extension}`;
      link.click();
    });
  }

  public pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.fetchDataPage();
  }

  public changeFalseReject(id: string) {
    this._repairService.changeFalseReject(id).subscribe(() => {
      this.fetchDataPage();
      const toastMessage = this._translate.instant('event.messages.update');
      this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
    });
  }

  public delete(element: RepairModel): void {
    const deleteItem = (id: string, name: string) => {
      this._repairService.delete(id).subscribe(() => this.fetchDataPage());
      const toastMessage = this._translate.instant('toasts.delete-repair');
      this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: element.id,
      title: 'repairs.title-delete',
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
    dialogRefEdit.afterClosed().subscribe(() => this.fetchDataPage());
  }

  public edit(element: RepairModel): void {
    this._repairService.setData(element.id);
    this._router.navigate([appRoutes.REPAIR, repairRoutes.REGISTRATION]);
  }
}
